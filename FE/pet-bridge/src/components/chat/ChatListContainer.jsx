import {createChatRoom, getChatRoomList} from "api/chat-api"
import {selectId, selectImage, selectNickname} from "features/user/users-slice"
import {useDispatch, useSelector} from "react-redux"
import {useEffect, useRef, useState} from "react"
import ChatAddIcon from "assets/icons/icon-chat-add.svg"
// import DefaultUserImage from "assets/image/default_user_150.png"
import SearchDropDownChat from "components/common/SearchDropDownChat"
import ChatListItem from "./ChatListItem"
import SockJS from "sockjs-client"
// eslint-disable-next-line import/no-unresolved
import {Stomp} from "@stomp/stompjs"
import {setCurrentChatId} from "features/chat/chat-slice"
import {Toast} from "utils/common-utils"
import Swal from "sweetalert2"

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL

const ChatListContainer = () => {
  const userId = useSelector(selectId)
  const myImage = useSelector(selectImage)
  const nickname = useSelector(selectNickname)
  // 채팅방 목록은 초기에 채팅 로드시 서버에 보내서 받아오고, 상태에 저장해둔 값으로 사용함
  const [chatList, setChatList] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const stompClient = useRef(null)
  const dispatch = useDispatch()

  // 채팅방 만들기 아이콘 클릭시
  const clickChatAddHandler = () => {
    setIsOpen(true)
  }

  // 선택 드롭다운 값 변경시
  const onDataChangeHandler = async (newData) => {
    console.log(newData)
    const result = await Swal.fire({
      title: `${newData.nickname} 님과의 채팅을 시작하시겠습니까?`,
      showCancelButton: true,
      confirmButtonText: "네",
      confirmButtonColor: "#fe85ac",
      cancelButtonText: "아니요",
      cancelButtonColor: "#a4a2a1",
      customClass: {
        confirmButton: "w-20 py-2 text-white font-semibold rounded-md",
        cancelButton: "w-20 py-2 text-white font-semibold rounded-md",
      },
    })
    if (result.isConfirmed) {
      try {
        const res = await createChatRoom(userId, newData.id)

        console.log(res)
        dispatch(setCurrentChatId(res.data))
      } catch (error) {
        console.log(error)
      }
    }
  }

  //   초기 컴포넌트 마운트시 동작
  useEffect(() => {
    const fetchChatList = async () => {
      try {
        // API로 채팅 리스트 받아오기
        const res = await getChatRoomList(userId)
        if (res.data) {
          // 받아온 채팅 리스트를 최근 메세지 시간순으로 정렬
          const sortedChatList = res.data.sort((a, b) => {
            if (!a.recentTime) return 1 // a의 recentTime이 없으면 a를 뒤로
            if (!b.recentTime) return -1 // b의 recentTime이 없으면 b를 앞으로
            return new Date(b.recentTime) - new Date(a.recentTime)
          })
          console.log(sortedChatList)
          setChatList(sortedChatList)
        }
      } catch (error) {
        console.log("----- FetchRooms 실패 -----", error)
        Toast.fire({
          icon: "warning",
          title: "채팅 목록을 불러오는 데 실패했어요.",
        })
      }
    }
    initializeConnection()
    fetchChatList()
  }, [])

  //   초기 리스트 로드시 소켓 연결
  const initializeConnection = () => {
    const socket = new SockJS(REACT_APP_SERVER_URL + "/api/ws/chat")
    stompClient.current = Stomp.over(socket)

    const onConnect = () => {
      stompClient.current.subscribe(
        `/topic/chat/users/${userId}`,
        (response) => {
          const updatedRoom = JSON.parse(response.body)

          // 특정 메시지 내용에 따라 알림을 띄움
          if (
            updatedRoom.recentMessage === "[알림] 새 계약서가 작성되었습니다"
          ) {
            Swal.fire({
              title: "새 계약서가 작성되었습니다!",
              text: "계약서가 작성되었으니 마이페이지에서 확인해주세요.",
              icon: "info",
              confirmButtonText: "확인",
              confirmButtonColor: "#fe85ac",
            })
          }

          setChatList((prevChatList) => {
            // 방이 이미 목록에 있는지 확인
            const index = prevChatList.findIndex(
              (room) => room.id === updatedRoom.id
            )
            let newRooms
            if (index !== -1) {
              // 기존 방을 새로 들어온 방으로 대체
              newRooms = [...prevChatList]
              newRooms[index] = updatedRoom
            } else {
              // 새로운 방을 목록 맨 위에 추가
              newRooms = [updatedRoom, ...prevChatList]
            }

            // 최근 시간이 없는 방을 맨 위로 정렬
            const sortedRooms = newRooms.sort((a, b) => {
              if (!a.recentTime) return 1 // a의 recentTime이 없으면 a를 뒤로
              if (!b.recentTime) return -1 // b의 recentTime이 없으면 b를 앞으로
              return new Date(b.recentTime) - new Date(a.recentTime) // 최근 시간이 있으면 내림차순 정렬
            })

            return sortedRooms
          })
        }
      )
    }

    const onError = (error) => {
      console.error("채팅 서버 연결 오류:", error)
    }

    stompClient.current.connect({}, onConnect, onError)
  }

  return (
    <div className="flex h-full w-60 flex-col divide-y">
      <div className="h-1/4 w-full p-3">
        <div className="flex h-3/4 items-center space-x-3">
          {/* {myImage} */}
          <img
            // src={myImage ? myImage : DefaultUserImage}
            src={myImage !== "null" ? myImage : "/images/profile.jpg"}
            alt="내 프로필"
            className="size-12 rounded-full"
            onError={(e) => {
              e.target.src = "/images/profile.jpg" // 이미지 로드 실패 시 기본 이미지로 대체
            }}
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
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          </div>
        </div>
      </div>
      <div className="hidden-scrollbar w-full grow divide-y overflow-x-hidden overflow-y-scroll">
        {chatList.map((chat) => (
          <ChatListItem
            key={chat.id}
            id={chat.id}
            opponentImage={chat.opponentImage}
            opponentId={chat.opponentId}
            opponentNickname={chat.opponentNickname}
            recentMessage={chat.recentMessage}
            recentTime={chat.recentTime}
          />
        ))}
      </div>
    </div>
  )
}

export default ChatListContainer
