/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */

// import React, {useState, useEffect, useCallback, useRef} from "react"
import React, {useState, useEffect, useRef} from "react"
import {OpenVidu} from "openvidu-browser"
import UserVideoComponent from "./UserVideoComponent"
import {useSelector} from "react-redux"
import {selectNickname} from "features/user/users-slice"
import axiosInstance from "api/axios-instance"
import {selectCurrentChatId, selectOpponentInfo} from "features/chat/chat-slice"
import DefaultUserImage from "assets/image/default_user_150.png"

// 애플리케이션 서버 URL 설정
const BASE_API_URL = process.env.REACT_APP_API_URL
const APPLICATION_SERVER_URL = BASE_API_URL
// process.env.NODE_ENV === "production" ? "" : "https://demos.openvidu.io/"

const CallPage = ({onEndCall}) => {
  // 상태 변수 선언
  const nickname = useSelector(selectNickname)
  const roomId = useSelector(selectCurrentChatId)
  const opponentInfo = useSelector(selectOpponentInfo)
  const [mySessionId, setMySessionId] = useState(roomId + "petbridge") // 세션 ID
  // const [setNowSession] = useState()
  const [myUserName, setMyUserName] = useState(nickname) // 사용자 이름
  const [session, setSession] = useState(undefined) // OpenVidu 세션
  const [mainStreamManager, setMainStreamManager] = useState(undefined) // 메인 비디오 스트림 매니저
  const [publisher, setPublisher] = useState(undefined) // 퍼블리셔
  const [subscribers, setSubscribers] = useState([]) // 구독자 목록
  const [currentVideoDevice, setCurrentVideoDevice] = useState(undefined) // 현재 비디오 디바이스

  // const [isAlone, setisAlone] = useState(true)

  const OV = useRef(null) // OpenVidu 객체를 위한 참조

  useEffect(() => {
    //페이지 접속하자마자 세션 요청
    JoinSession()

    // 컴포넌트가 언마운트 될 때 세션을 종료
    return () => {
      leaveSession()
    }
  }, [])

  useEffect(() => {
    const changeSessionID = () => {
      // console.log(roomId + "roomId")
      if (session) {
        leaveSession()
        //   session.disconnect()
      }
      const roomIdpetbridge = roomId + "petbridge"
      setMySessionId(roomIdpetbridge)
      console.log(mySessionId + "mySessionId")
      console.log(roomIdpetbridge)
      // console.log(roomId + "petbridge")
      // if (session) {
      //   leaveSession() // 기존 세션 종료
      //   setMySessionId(roomId + "petbridge") // 새 세션 ID 설정
      //   JoinSession() // 새 세션에 조인
      // }
    }
    changeSessionID()
  }, [roomId])

  useEffect(() => {
    const joinSessionByMySessionId = () => {
      // JoinSession()
      console.log(mySessionId)
    }

    joinSessionByMySessionId()
  }, [mySessionId])

  // 세션에 조인하는 함수
  const JoinSession = async () => {
    setMyUserName(nickname) // 사용자 이름. 현재 로그인한 유저 닉네임으로 입장
    setMySessionId(roomId + "petbridge") //세션 Id

    OV.current = new OpenVidu() //OpenVidu 객체 생성
    OV.current.enableProdMode()
    // OV.current.setAdvancedConfiguration({logLevel: "OFF"}) //로그 비활성화
    const mySession = OV.current.initSession() //세션생성
    setSession(mySession)

    //새로운 커넥션 생기는 경우
    mySession.on("connectionCreated", (event) => {
      //새 커넥션의 email을 memeber 배열에 추가
      console.log("Connection " + event.connection.connectionId + " created")
    })

    // session 객체 내에서
    // 새로운 스트림 수신 시, 관심 있는 세션 구독
    mySession.on("streamCreated", (event) => {
      console.log(subscribers)
      const subscriber = mySession.subscribe(event.stream, undefined)
      const existingNicknames = subscribers.map(
        (sub) => JSON.parse(sub.stream.connection.data).clientData
      )
      if (existingNicknames.includes(myUserName)) {
        console.log(existingNicknames)
      } else {
        setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber])
      }
      console.log("Create Subscriber nickname:", nickname)
    })

    // user가 video-call을 나갔을 때, 즉 session의 stream이 해제, 종료되었을 때
    mySession.on("streamDestroyed", (event) => {
      deleteSubscriber(event.stream.streamManager)
      console.log("DEstry Subscriber nickname:", nickname)
    })

    // 예외 발생 시
    mySession.on("exception", (exception) => {
      console.warn(exception)
    })

    try {
      const token = await getToken() // 토큰 가져오기
      await mySession.connect(token, {clientData: myUserName}) // 토큰을 가져와 세션에 연결

      const existingNicknames = subscribers.map(
        (sub) => JSON.parse(sub.stream.connection.data).clientData
      )
      if (existingNicknames.includes(myUserName)) {
        alert("이미 다른 참가자가 이 닉네임을 사용 중입니다.")
        leaveSession()
        return
      }

      // 세션에 참여할 사람의 설정 정보
      const publisher = await OV.current.initPublisherAsync(undefined, {
        audioSource: undefined, // 오디오 소스
        videoSource: undefined, // 비디오 소스
        publishAudio: true, // 오디오 게시 여부
        publishVideo: true, // 비디오 게시 여부
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
  }

  // 세션 종료 함수
  const leaveSession = () => {
    // window.location.reload() //추가한거
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

  const handleEndCall = () => {
    if (confirm("화상채팅을 종료하시겠습니까?")) {
      leaveSession()
      onEndCall(false)
    }
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

  // 구독자 삭제 함수
  const deleteSubscriber = () => {
    setSubscribers([])
  }

  // 토큰 가져오기
  const getToken = async () => {
    const sessionId = await createSession(mySessionId)
    // setNowSession(sessionId)
    if (sessionId === "") {
      alert("세션받아오기 실패")
    }
    return await createToken(sessionId)
  }

  // 세션 생성
  const createSession = async (sessionId) => {
    const response = await axiosInstance.post(
      `${APPLICATION_SERVER_URL}/sessions`,
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
      `${APPLICATION_SERVER_URL}/sessions/${sessionId}/connections`,
      {},
      {
        headers: {"Content-Type": "application/json"},
      }
    )
    return response.data // 토큰 반환
  }

  return (
    <div className="hidden-scrollbar flex size-full h-full flex-col bg-gray-700">
      <div className="flex items-center space-x-2 bg-white px-3 py-1">
        <img
          src={opponentInfo.image ? opponentInfo.image : DefaultUserImage}
          alt=""
          className="size-12 rounded-full border-2"
        />
        <span className="font-bold">{opponentInfo.nickname}</span>
        <span>님과의 화상채팅</span>
      </div>
      {/* <ul className="absolute bg-gray-100">
        {subscribers.map((sub, index) => (
          <li key={index}>
            Subscriber ID: {JSON.parse(sub.stream.connection.data).clientData}
          </li>
        ))}
      </ul> */}

      <div id="session" className="relative flex h-full flex-col bg-white">
        <div className="relative my-auto flex size-full bg-black">
          {subscribers && (
            <div className="h-full flex-1">
              <UserVideoComponent streamManager={subscribers[0]} />
            </div>
          )}
          {publisher !== undefined && (
            <div className="absolute bottom-0 right-0 w-[200px] p-2">
              <UserVideoComponent streamManager={publisher} />
            </div>
          )}
        </div>
        <div className="absolute bottom-5 flex h-8 w-full space-x-4 ">
          {/* <button
            className=" bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            id="buttonLeaveSession"
            onClick={leaveSession}
          >
            Leave session
          </button> */}
          <div className="flex w-full items-center justify-center space-x-5">
            <button
              className="h-8 rounded-xl bg-green-500 px-4 text-white hover:bg-green-600"
              id="buttonSwitchCamera"
              onClick={switchCamera}
            >
              화면전환
            </button>
            {/* <button
            className=" bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            id="buttonLeaveSession"
            onClick={deleteSubscriber}
          >
            구독자 삭제
          </button> */}
            <button className="size-8" onClick={handleEndCall}>
              <img src="/icons/icon-endCall.svg" alt="endcall" />
            </button>
          </div>
        </div>
        {/* <ul className="absolute bg-gray-100">
          {roomId}
          {session === undefined ? (
            <div className="flex flex-col items-center justify-center">
              <div id="join-dialog" className="rounded-lg bg-red-100">
                <button
                  type="submit"
                  onClick={() => {
                    JoinSession()
                  }}
                >
                  (세션 없음)세션 만들기.
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center">
              참여중 세션 아이디 : {mySessionId}
            </div>
          )}
        </ul> */}
      </div>
    </div>
  )
}

export default CallPage
