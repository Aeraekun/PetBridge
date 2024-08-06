import {useDispatch, useSelector} from "react-redux"
import {useState} from "react"
import {selectId, selectImage, selectNickname} from "features/user/users-slice"
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
import ChatAddIcon from "assets/icons/icon-chat-add.svg"
import CloseIcon from "assets/icons/icon-close.svg"
import MinimizeIcon from "assets/icons/icon-minimize.svg"
import ChatListItem from "components/chat/ChatListItem"
import ChatMain from "components/chat/ChatMain"
import SearchDropDownChat from "components/common/SearchDropDownChat"
import {createChatRoom} from "api/chat-api"

const ChatModal = () => {
  const dispatch = useDispatch()

  const userId = useSelector(selectId)
  const myImage = useSelector(selectImage)
  const nickname = useSelector(selectNickname)
  const currentChatId = useSelector(selectCurrentChatId)

  // 채팅모달 표시 및 드래그 동작 관련
  const isOpen = useSelector(selectIsChatModalOpen)
  const isMinimized = useSelector(selectIsChatMinimized)
  const [isDragging, setIsDragging] = useState(false)

  // 새 채팅 감지 -> 구현시 redux state로
  const [newChats] = useState([{id: "user2", message: "hi"}])
  // 채팅방 목록은 초기에 채팅 로드시 서버에 보내서 받아오고, 상태에 저장해둔 값으로 사용함
  const [chatList] = useState([
    {
      id: "132424151",
      opponentId: "2",
      opponentNickname: "user2",
      opponentImage: "dd",
      recentMessage: "마지막메세지",
      recentTime: "",
    },
    {
      id: "132424152",
      opponentId: "3",
      opponentNickname: "user3",
      opponentImage: "ff",
      recentMessage: "ㅎㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ",
    },
    {
      id: "132424153",
      opponentId: "4",
      opponentNickname: "user4",
      opponentImage: "ff",
      recentMessage: "ㅎㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ",
    },
    {
      id: "132424154",
      opponentId: "5",
      opponentNickname: "user5",
      opponentImage: "ff",
      recentMessage: "ㅎㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ",
    },
    {
      id: "132424155",
      opponentId: "6",
      opponentNickname: "user6",
      opponentImage: "ff",
      recentMessage: "ㅎㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ",
    },
    {
      id: "132424156",
      opponentId: "7",
      opponentNickname: "user7",
      opponentImage: "ff",
      recentMessage: "asdfasdfㅇㅇㅇㅇㅇ",
    },
    {
      id: "132424158",
      opponentId: "8",
      opponentNickname: "user8",
      opponentImage: "ff",
      recentMessage: "asdfasdfㅇㅇㅇㅇㅇ",
    },
    {
      id: "132424159",
      opponentId: "9",
      opponentNickname: "user9",
      opponentImage: "ff",
      recentMessage: "asdfasdfㅇㅇㅇㅇㅇ",
    },
  ])

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

  // 채팅방 만들기 아이콘 클릭시
  const clickChatAddHandler = () => {
    console.log("Chat Add")
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
  }

  // 선택 드롭다운 값 변경시
  const onDataChangeHandler = (newData) => {
    console.log(newData)
    if (confirm(`${newData} 님과의 채팅을 시작히시겠습니까?`)) {
      createChatRoom(userId, newData)
    }
  }

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
                <span className="bg-alert fixed bottom-0 right-0 flex size-5 items-center justify-center rounded-full text-xs">
                  <span className="text-white">{newChats.length}</span>
                  <span className="bg-alert fixed size-4 animate-ping rounded-full"></span>
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
                {/* 채팅 메인 화면 */}
                <main className="flex h-[calc(100%-2rem)] grow divide-x">
                  {/* 채팅 네비게이션 목록 */}
                  <div className="flex h-full w-60 flex-col divide-y">
                    <div className="h-1/4 w-full p-3">
                      <div className="flex h-3/4 items-center space-x-3">
                        <img
                          src={myImage}
                          alt="내 프로필"
                          className="size-12 rounded-full"
                        />
                        <span className="font-bold ">{nickname}</span>
                      </div>
                      <div className="flex justify-between">
                        내 채팅 목록
                        <button onClick={clickChatAddHandler}>
                          <img
                            src={ChatAddIcon}
                            alt="chat-add"
                            className="inline-flex size-6"
                          />
                        </button>
                        <div className="fixed">
                          <SearchDropDownChat
                            subtitle="유저를 선택해주세요."
                            placeholder="유저 닉네임으로 검색"
                            itemName="유저"
                            onDataChange={onDataChangeHandler}
                            className="fixed"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-full grow overflow-x-hidden overflow-y-scroll">
                      {chatList.map((chat) => (
                        <ChatListItem
                          key={chat.id}
                          id={chat.id}
                          opponentImage={chat.opponentImage}
                          opponentId={chat.opponentId}
                          opponentNickname={chat.opponentNickname}
                          recentMessage={chat.recentMessage}
                        />
                      ))}
                    </div>
                  </div>
                  {currentChatId && <ChatMain />}
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
