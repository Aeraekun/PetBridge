/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, {useState, useEffect, useCallback, useRef} from "react"
import {OpenVidu} from "openvidu-browser"
import UserVideoComponent from "./UserVideoComponent"
import {useSelector} from "react-redux"
import {selectNickname} from "features/user/users-slice"
import axiosInstance from "api/axios-instance"

// 애플리케이션 서버 URL 설정
const APPLICATION_SERVER_URL = "http://localhost:8080/"
// process.env.NODE_ENV === "production" ? "" : "https://demos.openvidu.io/"

const CallPage = () => {
  // 상태 변수 선언
  const nickname = useSelector(selectNickname)
  const sessionId = "petbridge"
  const [mySessionId, setMySessionId] = useState(sessionId) // 세션 ID
  const [myUserName, setMyUserName] = useState(nickname) // 사용자 이름
  const [session, setSession] = useState(undefined) // OpenVidu 세션
  const [mainStreamManager, setMainStreamManager] = useState(undefined) // 메인 비디오 스트림 매니저
  const [publisher, setPublisher] = useState(undefined) // 퍼블리셔
  const [subscribers, setSubscribers] = useState([]) // 구독자 목록
  const [currentVideoDevice, setCurrentVideoDevice] = useState(undefined) // 현재 비디오 디바이스

  const OV = useRef(null) // OpenVidu 객체를 위한 참조

  useEffect(() => {
    //페이지 접속하자마자 세션 요청
    InitSession()

    // 컴포넌트가 언마운트 될 때 세션을 종료
    return () => {
      leaveSession()
    }
  }, [])

  // 세션에 조인하는 함수 (페이지에 들어가자마자 세션 요청해서 들어감.)
  const InitSession = useCallback(async () => {
    setMyUserName(nickname) // 사용자 이름. 현재 로그인한 유저 닉네임으로 입장
    setMySessionId(sessionId) //세션 Id

    OV.current = new OpenVidu() //OpenVidu 객체 생성
    // OV.current.setAdvancedConfiguration({logLevel: "OFF"}) //로그 비활성화
    const mySession = OV.current.initSession() //세션생성
    setSession(mySession)

    // session 객체 내에서
    // 새로운 스트림 수신 시, 관심 있는 세션 구독
    mySession.on("streamCreated", (event) => {
      const subscriber = mySession.subscribe(event.stream, undefined)
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber])
    })

    // user가 video-call을 나갔을 때, 즉 session의 stream이 해제, 종료되었을 때
    mySession.on("streamDestroyed", (event) => {
      deleteSubscriber(event.stream.streamManager)
    })

    // 예외 발생 시
    mySession.on("exception", (exception) => {
      console.warn(exception)
    })

    try {
      const token = await getToken() // 토큰 가져오기
      await mySession.connect(token, {clientData: myUserName}) // 토큰을 가져와 세션에 연결

      // 세션에 참여할 사람의 설정 정보
      const publisher = await OV.current.initPublisherAsync(undefined, {
        audioSource: undefined, // 오디오 소스
        videoSource: undefined, // 비디오 소스
        publishAudio: false, // 오디오 게시 여부
        publishVideo: false, // 비디오 게시 여부
        resolution: "640x480", // 비디오 해상도
        frameRate: 30, // 비디오 프레임 속도
        insertMode: "APPEND", // 비디오 삽입 모드
        mirror: true, // 비디오 미러링 여부
      })

      await mySession.publish(publisher) // 생성된 publisher을 session에 등록

      // 시스템에서 가용 가능한 디바이스 기기들을 가져옴
      // 사용할 비디오 디바이스 정보 가져오기
      const devices = await OV.current.getDevices() //권한 묻지않음()?getUserMedia()는 권한허용을 물어봄.
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
    window.location.reload() //추가한거
    if (session) {
      session.disconnect()
    }

    // 상태 초기화
    OV.current = null
    setSession(undefined)
    setSubscribers([])
    setMySessionId("null")
    setMyUserName(nickname)
    setMainStreamManager(undefined)
    setPublisher(undefined)
  }

  // 카메라 전환 함수
  const switchCamera = async () => {
    console.log(subscribers)
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
    const response = await axiosInstance.post(
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
    const response = await axiosInstance.post(
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
            <button
              className="mt-4 rounded-lg bg-green-500 px-4 py-2 text-white "
              type="submit"
              onClick={InitSession}
            >
              JOIN
            </button>
          </div>
        </div>
      ) : (
        <div
          id="join"
          className="flex flex-1 flex-col items-center justify-center"
        >
          <div id="join-dialog" className="rounded-lg bg-white p-8 shadow-lg">
            <div className=" mt-4 rounded-lg px-4 py-2">참여중</div>
          </div>
        </div>
      )}

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
            <button
              className="btn btn-large btn-danger rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              id="buttonLeaveSession"
              onClick={deleteSubscriber}
            >
              구독자 삭제
            </button>
          </div>
        </div>
        {mainStreamManager !== undefined ? (
          <div
            id="main-video"
            className="w-[600px] flex-1 border p-4 "
            onClick={() => handleMainVideoStream(publisher)}
          >
            <div> 메인스트리머</div>
            <UserVideoComponent streamManager={mainStreamManager} />
          </div>
        ) : null}

        <div id="video-container" className="flex flex-wrap p-4">
          {publisher !== undefined ? (
            <div
              className=" w-[400px] flex-1 cursor-pointer border p-2"
              onClick={() => handleMainVideoStream(publisher)}
            >
              <div> 퍼블리셔</div>
              <UserVideoComponent streamManager={publisher} />
            </div>
          ) : null}
          {subscribers.map((sub) => (
            <div
              key={sub.id}
              className="stream-container col-md-6 col-xs-6 w-[200px]"
              onClick={() => this.handleMainVideoStream(sub)}
            >
              <span>{sub.id}</span>
              <UserVideoComponent streamManager={sub} />
            </div>
          ))}
          {myUserName}
        </div>
      </div>
    </div>
  )
}

export default CallPage
