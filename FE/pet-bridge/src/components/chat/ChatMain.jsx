import {useSelector} from "react-redux"
import MessageItem from "./MessageItem"
import {selectId} from "features/user/users-slice"
import {selectCurrentChatId} from "features/chat/chat-slice"
import {useEffect, useRef, useState} from "react"
import {postChatMessage} from "api/chat-api"

const ChatMain = () => {
  const [chatMessageRequestDto, setChatMessageRequestDto] = useState({
    roomId: null,
    senderId: null,
    content: "",
  })

  const userId = useSelector(selectId)
  const roomId = useSelector(selectCurrentChatId)
  const [messages, setMessages] = useState([
    {
      roomId: 2,
      senderId: 3,
      content: "안녕하세요!",
      registTime: "2024-08-04T10:00:00",
    },
    {
      roomId: 2,
      senderId: 4,
      content: "오늘 날씨 정말 좋네요.",
      registTime: "2024-08-04T10:01:00",
    },
    {
      roomId: 2,
      senderId: 3,
      content: "점심 뭐 드셨어요?",
      registTime: "2024-08-04T10:02:00",
    },
    {
      roomId: 2,
      senderId: 4,
      content: "지금 어디 계세요?",
      registTime: "2024-08-04T10:03:00",
    },
    {
      roomId: 2,
      senderId: 3,
      content: "곧 도착합니다.",
      registTime: "2024-08-04T10:04:00",
    },
    {
      roomId: 2,
      senderId: 4,
      content: "오늘 일정 어떻게 되세요?",
      registTime: "2024-08-04T10:05:00",
    },
    {
      roomId: 2,
      senderId: 3,
      content: "회의 준비 다 되셨나요?",
      registTime: "2024-08-04T10:06:00",
    },
    {
      roomId: 2,
      senderId: 4,
      content: "다음 주에 시간 되시나요?",
      registTime: "2024-08-04T10:07:00",
    },
    {
      roomId: 2,
      senderId: 3,
      content: "최근에 본 영화 추천 좀 해주세요.",
      registTime: "2024-08-04T10:08:00",
    },
    {
      roomId: 2,
      senderId: 4,
      content: "저녁에 뭐 먹을까요?",
      registTime: "2024-08-04T10:09:00",
    },
    {
      roomId: 2,
      senderId: 3,
      content: "이번 주말에 뭐 하세요?",
      registTime: "2024-08-04T10:10:00",
    },
    {
      roomId: 2,
      senderId: 4,
      content: "새 프로젝트 시작했어요.",
      registTime: "2024-08-04T10:11:00",
    },
    {
      roomId: 2,
      senderId: 3,
      content: "도움이 필요합니다.",
      registTime: "2024-08-04T10:12:00",
    },
    {
      roomId: 2,
      senderId: 4,
      content: "잠시 후 전화 드리겠습니다.",
      registTime: "2024-08-04T10:13:00",
    },
    {
      roomId: 2,
      senderId: 3,
      content: "내일 만나 뵐 수 있을까요?",
      registTime: "2024-08-04T10:14:00",
    },
    {
      roomId: 2,
      senderId: 4,
      content: "지금 시간 괜찮으세요?",
      registTime: "2024-08-04T10:15:00",
    },
    {
      roomId: 2,
      senderId: 3,
      content: "연락 주셔서 감사합니다.",
      registTime: "2024-08-04T10:16:00",
    },
    {
      roomId: 2,
      senderId: 4,
      content: "문서 검토 부탁드립니다.",
      registTime: "2024-08-04T10:17:00",
    },
    {
      roomId: 2,
      senderId: 3,
      content: "곧 다시 연락드리겠습니다.",
      registTime: "2024-08-04T10:18:00",
    },
    {
      roomId: 2,
      senderId: 4,
      content: "좋은 하루 되세요!",
      registTime: "2024-08-04T10:19:00",
    },
  ])
  const [messageInput, setMessageInput] = useState("")
  const messagesEndRef = useRef(null)

  // 초기 메세지를 로드함
  useEffect(() => {
    const initMessageForm = () => {
      setChatMessageRequestDto({
        ...chatMessageRequestDto,
        roomId: Number(roomId),
        senderId: userId,
      })
    }

    initMessageForm()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 채팅이 입력되면 입력된 문자를 메세지 전송을 위한 Form에 갱신시켜줌
  const changeHandler = (event) => {
    const newMessage = event.target.value
    setMessageInput(newMessage)
    console.log(event.target.value)
    setChatMessageRequestDto((chatMessageRequestDto) => ({
      ...chatMessageRequestDto,
      content: newMessage,
    }))
  }

  // 엔터시 clickSendHandler를 동작시킴

  const keyDownHandler = (event) => {
    if (event.key === "Enter") {
      clickSendHandler()
    }
  }

  postChatMessage
  // 채팅을 전송하고, 전송에 성공해서 메세지 객체를 받아오면 해당 값을 메세지 목록에 추가
  const clickSendHandler = async () => {
    // const res = await postChatMessage(chatMessageRequestDto)
    // const newMessage = res.data
    // if (newMessage) {
    //   messages.push(newMessage)
    // }
    // 임시로 그냥 push

    const now = new Date()
    const nowRegistTime = now.toISOString().slice(0, 19)
    const newMessage = {...chatMessageRequestDto, registTime: nowRegistTime}
    console.log(newMessage)
    setMessages((prveMessages) => [...prveMessages, newMessage])
    setChatMessageRequestDto((prevMessageDto) => ({
      ...prevMessageDto,
    }))
    setMessageInput("")
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
  }, [messages])

  return (
    <>
      <div className="flex size-full flex-col divide-y">
        <div className="flex items-center space-x-2 px-3 py-1">
          <img src="" alt="" className="size-12 rounded-full border-2" />
          <span className="font-bold">유저</span>
          <span>님과의 채팅</span>
        </div>
        <div className="grow overflow-auto p-3" id="chat-container">
          {messages.map((message, index) => (
            <MessageItem
              key={index}
              isMyMessage={Number(userId) === Number(message.senderId)}
              content={message.content}
              registTime={message.registTime}
            />
          ))}
        </div>
        <div ref={messagesEndRef} />
        <div className="flex space-x-3 p-3">
          <input
            value={messageInput}
            onChange={changeHandler}
            onKeyDown={keyDownHandler}
            type="text"
            className="grow rounded-xl bg-stroke p-2 text-white"
            placeholder="입력하세요"
            id="message-input"
          />
          <button
            onClick={clickSendHandler}
            className="size-12 rounded-full border-2"
          >
            전송
          </button>
          <button className="size-12 rounded-full border-2">화상</button>
        </div>
      </div>
    </>
  )
}

export default ChatMain
