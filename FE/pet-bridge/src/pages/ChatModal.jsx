import {useDispatch, useSelector} from "react-redux"
import {useEffect, useState} from "react"
import {
  selectIsChatModalOpen,
  selectIsChatMinimized,
  setIsChatModalOpen,
  setIsChatMinimized,
  selectCurrentChatId,
  setCurrentChatId,
} from "features/chat/chat-slice"
import Draggable from "react-draggable"
import ChatIcon from "assets/icons/icon-chat.svg"
import CloseIcon from "assets/icons/icon-close.svg"
import MinimizeIcon from "assets/icons/icon-minimize.svg"
import ChatMainContainer from "components/chat/ChatMainContainer"
import ChatListContainer from "components/chat/ChatListContainer"
import CallPage from "components/chat/CallPage"

const ChatModal = () => {
  const dispatch = useDispatch()

  const currentChatId = useSelector(selectCurrentChatId)

  // 채팅모달 표시 및 드래그 동작 관련
  const isOpen = useSelector(selectIsChatModalOpen)
  const isMinimized = useSelector(selectIsChatMinimized)
  const [isDragging, setIsDragging] = useState(false)

  // 새 채팅 감지 -> 구현시 redux state로
  const [newChats] = useState([{id: "user2", message: "hi"}])

  // 처음 컴포넌트 로드시, 유저의 방번호로 채팅 소켓을 연결함

  // 채팅 종료 X 버튼 클릭시 동작
  const onClickXHandler = () => {
    dispatch(setIsChatModalOpen())
  }
  // 채팅 종료 클릭시 동작
  const onClickIcon = () => {
    dispatch(setIsChatMinimized())
  }

  // 최소화 버튼 클릭시 동작
  const onClickMinimizeHandler = () => {
    // 현재 채팅중인 유저를 없 null값 처리를 해준다.
    if (currentChatId) {
      dispatch(setCurrentChatId(null))
      return
    }
    dispatch(setIsChatMinimized())
  }

  // 채팅 플로팅 아이콘
  const handleStart = () => {
    setIsDragging(false)
  }

  const handleDrag = () => {
    setIsDragging(true)
  }

  const handleStop = () => {
    setTimeout(() => setIsDragging(false), 1)
  }

  const handleClick = (event) => {
    if (isDragging) {
      event.preventDefault()
    } else {
      onClickIcon()
    }
    // setIsCall(!isCall)
  }

  // 화상채팅여부
  const [isCall, setIsCall] = useState(false)

  useEffect(() => {
    setIsCall(false)
  }, [currentChatId])
  const handleCall = (event) => {
    console.log(isCall, "isCall")
    setIsCall(event)
  }
  // 유저 아이디로 채팅방 목록을 받아오기

  return (
    <div>
      {isOpen ? (
        <div className="fixed left-20 top-40 z-10 size-1 h-screen w-screen">
          {isMinimized ? (
            // 채팅 모달 버튼 정의
            <Draggable
              onStart={handleStart}
              onDrag={handleDrag}
              onStop={handleStop}
            >
              <button
                onClick={handleClick}
                className="rounded-full border bg-white p-2 shadow-xl transition-all hover:outline"
              >
                <img
                  src={ChatIcon}
                  alt=""
                  className="pointer-events-none size-8"
                />
                <span className="fixed bottom-0 right-0 flex size-5 items-center justify-center rounded-full bg-alert text-xs">
                  <span className="text-white">{newChats.length}</span>
                  <span className="fixed size-4 animate-ping rounded-full bg-alert"></span>
                </span>
              </button>
            </Draggable>
          ) : (
            <Draggable handle="#chatHeader">
              {/* 전체 틀 */}
              <div
                className={`flex h-[600px] flex-col divide-y overflow-hidden rounded-lg border bg-white shadow-2xl transition-[width] ${!currentChatId ? "w-60" : "w-[800px]"}`}
              >
                {/* 채팅 헤더 */}
                <header
                  className="flex h-8 shrink-0 flex-row-reverse bg-white px-2.5"
                  id="chatHeader"
                >
                  <button
                    onClick={onClickXHandler}
                    className="rounded-xl px-2 hover:bg-slate-400"
                  >
                    <img src={CloseIcon} alt="close" className="size-4" />
                  </button>
                  <button
                    onClick={onClickMinimizeHandler}
                    className="rounded-xl px-2 hover:bg-slate-400"
                  >
                    <img src={MinimizeIcon} alt="minimize" className="size-4" />
                  </button>
                </header>
                {/* 채팅 헤더 아래 (목록 / 채팅) */}
                <main className="flex h-[calc(100%-2rem)] grow divide-x">
                  <ChatListContainer />
                  {/* 우측 채팅 화면 */}
                  {currentChatId ? (
                    isCall ? (
                      <div className="size-full overflow-auto">
                        <CallPage onEndCall={handleCall} />
                      </div>
                    ) : (
                      <ChatMainContainer onStartCall={handleCall} />
                    )
                  ) : null}
                </main>
              </div>
            </Draggable>
          )}
        </div>
      ) : null}
    </div>
  )
}

export default ChatModal
