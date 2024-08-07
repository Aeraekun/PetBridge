/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, {useState, useEffect, useCallback, useRef} from "react"
import {OpenVidu} from "openvidu-browser"
import axios from "axios"
import UserVideoComponent from "./UserVideoComponent"
import {useSelector} from "react-redux"
import {selectNickname} from "features/user/users-slice"

// 애플리케이션 서버 URL 설정
const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === "production" ? "" : "https://demos.openvidu.io/"

const CallPage = () => {
  // 상태 변수 선언
  const [mySessionId, setMySessionId] = useState("session") // 세션 ID
  const [myUserName, setMyUserName] = useState(
    "Participant" + Math.floor(Math.random() * 100)
  ) // 사용자 이름
  const [session, setSession] = useState(undefined) // OpenVidu 세션
  const [mainStreamManager, setMainStreamManager] = useState(undefined) // 메인 비디오 스트림 매니저
  const [publisher, setPublisher] = useState(undefined) // 퍼블리셔
  const [subscribers, setSubscribers] = useState([]) // 구독자 목록
  const [currentVideoDevice, setCurrentVideoDevice] = useState(undefined) // 현재 비디오 디바이스

  const OV = useRef(null) // OpenVidu 객체를 위한 참조

  const nickname = useSelector(selectNickname)
  useEffect(() => {
    // 컴포넌트가 언마운트 될 때 세션을 종료

    return () => {
      leaveSession()
    }
  }, [])

  // 세션에 조인하는 함수
  const joinSession = useCallback(async () => {
    // 사용자 이름 변경 . 현재 로그인한 유저 닉네임으로 입장
    setMyUserName(nickname)
    //세션 Id
    setMySessionId("0")
    OV.current = new OpenVidu()
    const mySession = OV.current.initSession()
    setSession(mySession)

    // 새로운 스트림 수신 시, 관심 있는 세션 구독
    mySession.on("streamCreated", (event) => {
      const subscriber = mySession.subscribe(event.stream, undefined)
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber])
    })

    // 스트림이 종료되었을 때
    mySession.on("streamDestroyed", (event) => {
      deleteSubscriber(event.stream.streamManager)
    })

    // 예외 발생 시
    mySession.on("exception", (exception) => {
      console.warn(exception)
    })

    try {
      const token = await getToken() // 토큰 가져오기
      await mySession.connect(token, {clientData: myUserName}) // 세션에 연결

      // 카메라 스트림 초기화
      const publisher = await OV.current.initPublisherAsync(undefined, {
        audioSource: undefined, // 오디오 소스
        videoSource: undefined, // 비디오 소스
        publishAudio: true, // 오디오 게시 여부
        publishVideo: true, // 비디오 게시 여부
        resolution: "1280x720", // 비디오 해상도
        frameRate: 30, // 비디오 프레임 속도
        insertMode: "APPEND", // 비디오 삽입 모드
        mirror: true, // 비디오 미러링 여부
      })

      await mySession.publish(publisher) // 퍼블리셔 스트림 게시

      // 현재 비디오 디바이스 가져오기
      const devices = await OV.current.getDevices()
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      )
      const currentVideoDeviceId = publisher.stream
        .getMediaStream()
        .getVideoTracks()[0]
        .getSettings().deviceId
      const currentVideoDevice = videoDevices.find(
        (device) => device.deviceId === currentVideoDeviceId
      )

      // 상태 업데이트
      setCurrentVideoDevice(currentVideoDevice)
      setMainStreamManager(publisher)
      setPublisher(publisher)
    } catch (error) {
      console.log("세션 연결 중 오류 발생:", error.code, error.message)
    }
  }, [myUserName])

  // 세션 종료 함수
  const leaveSession = () => {
    if (session) {
      session.disconnect()
    }

    // 상태 초기화
    OV.current = null
    setSession(undefined)
    setSubscribers([])
    setMySessionId("SessionA")
    setMyUserName("Participant" + Math.floor(Math.random() * 100))
    setMainStreamManager(undefined)
    setPublisher(undefined)
  }

  // 카메라 전환 함수
  const switchCamera = async () => {
    try {
      const devices = await OV.current.getDevices()
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      )

      if (videoDevices.length > 1) {
        const newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== currentVideoDevice.deviceId
        )

        if (newVideoDevice.length > 0) {
          const newPublisher = OV.current.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          })

          await session.unpublish(mainStreamManager)
          await session.publish(newPublisher)

          // 상태 업데이트
          setCurrentVideoDevice(newVideoDevice[0])
          setMainStreamManager(newPublisher)
          setPublisher(newPublisher)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  // 메인 비디오 스트림 설정 핸들러
  const handleMainVideoStream = (stream) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream)
    }
  }

  // 구독자 삭제 함수
  const deleteSubscriber = (streamManager) => {
    setSubscribers((prevSubscribers) =>
      prevSubscribers.filter((sub) => sub !== streamManager)
    )
  }

  // 토큰 가져오기
  const getToken = async () => {
    const sessionId = await createSession(mySessionId)
    return await createToken(sessionId)
  }

  // 세션 생성
  const createSession = async (sessionId) => {
    const response = await axios.post(
      `${APPLICATION_SERVER_URL}api/sessions`,
      {customSessionId: sessionId},
      {
        headers: {"Content-Type": "application/json"},
      }
    )
    return response.data // 세션 ID 반환
  }

  // 토큰 생성
  const createToken = async (sessionId) => {
    const response = await axios.post(
      `${APPLICATION_SERVER_URL}api/sessions/${sessionId}/connections`,
      {},
      {
        headers: {"Content-Type": "application/json"},
      }
    )
    return response.data // 토큰 반환
  }

  return (
    <div className="flex h-screen flex-col bg-gray-100 p-4">
      {session === undefined ? (
        <div
          id="join"
          className="flex flex-1 flex-col items-center justify-center"
        >
          <div id="join-dialog" className="rounded-lg bg-white p-8 shadow-lg">
            <h1 className="mb-4 text-2xl font-bold">비디오 세션에 참여하기</h1>
            <button
              className="btn btn-lg btn-success mt-4 rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
              type="submit"
              onClick={joinSession}
            >
              JOIN
            </button>
          </div>
        </div>
      ) : null}

      {session !== undefined ? (
        <div id="session" className="flex h-full flex-col">
          <div
            id="session-header"
            className="flex items-center justify-between bg-white p-4 shadow-md"
          >
            <h1 id="session-title" className="text-xl font-bold">
              {myUserName}
            </h1>
            <div className="flex space-x-4">
              <button
                className="btn btn-large btn-danger rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                id="buttonLeaveSession"
                onClick={leaveSession}
              >
                Leave session
              </button>
              <button
                className="btn btn-large btn-success rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                id="buttonSwitchCamera"
                onClick={switchCamera}
              >
                Switch Camera
              </button>
            </div>
          </div>

          {mainStreamManager !== undefined ? (
            <div id="main-video" className="flex-1 border p-4">
              <div> 메인스트리머</div>
              <UserVideoComponent streamManager={mainStreamManager} />
            </div>
          ) : null}

          <div id="video-container" className="flex flex-wrap p-4">
            {publisher !== undefined ? (
              <div
                className="stream-container flex-1 cursor-pointer border p-2"
                onClick={() => handleMainVideoStream(publisher)}
              >
                <div> 구독</div>
                <UserVideoComponent streamManager={publisher} />
              </div>
            ) : null}
            {subscribers.map((sub) => (
              <div
                key={sub.id}
                className="stream-container flex-1 cursor-pointer p-2"
                onClick={() => handleMainVideoStream(sub)}
              >
                <div> 서브</div>
                <UserVideoComponent streamManager={sub} />
              </div>
            ))}

            {myUserName}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default CallPage
