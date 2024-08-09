import {useSelector} from "react-redux"
import MessageItem from "./MessageItem"
import DefaultUserImage from "assets/image/default_user_150.png"
import {selectId} from "features/user/users-slice"
import {selectCurrentChatId, selectOpponentInfo} from "features/chat/chat-slice"
import {useEffect, useRef, useState} from "react"
import SockJS from "sockjs-client"
// eslint-disable-next-line import/no-unresolved
import {Stomp} from "@stomp/stompjs"
import {getChatMessageList} from "api/chat-api"
import {useInView} from "react-intersection-observer"
import SendIcon from "assets/icons/icon-send-message.svg"
import CallIcon from "assets/icons/icon-call-facetime.svg"

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL

const ChatMainContainer = () => {
  const [chatMessageRequestDto, setChatMessageRequestDto] = useState({
    roomId: null,
    senderId: null,
    content: "",
  })

  const opponentInfo = useSelector(selectOpponentInfo)

  const userId = useSelector(selectId)
  const roomId = useSelector(selectCurrentChatId)
  const stompClient = useRef(null)
  const messagesEndRef = useRef(null)
  const [messages, setMessages] = useState([])
  const [messageInput, setMessageInput] = useState("")
  const [searchPage, setSearchPage] = useState(0)
  const [fetchMessages, setFetchMessages] = useState(false)
  const [isMessagesLeft, setIsMessagesLeft] = useState(true)

  const initMessageForm = () => {
    setChatMessageRequestDto({
      ...chatMessageRequestDto,
      roomId: Number(roomId),
      senderId: userId,
    })
  }

  // 컴포넌트 로드시 메세지 Dto 양식 작성
  useEffect(() => {
    initMessageForm()
  }, [])

  // roomId 변경시 채팅 관련 내용 전부 초기화
  useEffect(() => {
    const initChats = async () => {
      console.log("#####----- init -----#####", roomId, userId)
      // 초기화 내용
      // 검색 파라미터 설정,
      // 채팅을 연결하고
      await initChatConnection(roomId, userId)
      // 메세지 폼 양식을 설정해주고, 해당 방의 채팅 메세지를 가져옴
      initMessageForm()
      setMessages([])
      setIsMessagesLeft(true)
      setSearchPage(0)
      setFetchMessages(true)
    }

    // 메세지 목록을 초기화시켜줌

    initChats()

    return () => {
      if (stompClient.current) {
        stompClient.current.disconnect()
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId])

  // fetchMessages가 true가 되면 메세지 로드
  useEffect(() => {
    const fetchNewMessages = async () => {
      if (fetchMessages) {
        const newMessages = await getChatMessages(roomId)
        if (newMessages && newMessages.length > 0) {
          setMessages((prevMessages) => [...newMessages, ...prevMessages])
        } else {
          setIsMessagesLeft(false)
        }
        setFetchMessages(false)
      }
    }
    fetchNewMessages()
  }, [fetchMessages])

  // 채팅이 입력되면 입력된 문자를 메세지 전송을 위한 Form에 갱신시켜줌
  const changeHandler = (event) => {
    const newMessage = event.target.value
    setMessageInput(newMessage)
    setChatMessageRequestDto((chatMessageRequestDto) => ({
      ...chatMessageRequestDto,
      content: newMessage,
    }))
  }

  // 엔터시 clickSendHandler를 동작시킴

  const keyDownHandler = (event) => {
    if (event.key === "Enter") {
      sendHandler()
    }
  }

  // 채팅을 전송하고, 메세지 객체를 받아오면 해당 값을 메세지 목록에 추가
  const sendHandler = async () => {
    if (stompClient.current && messageInput) {
      const sendingMessage = {
        roomId,
        senderId: userId,
        content: messageInput,
        opponentId: opponentInfo.id,
      }
      console.log(sendingMessage)
      stompClient.current.send(
        `/app/api/chat/messages`,
        {},
        JSON.stringify(sendingMessage)
      )
      setMessageInput("")
    }
  }

  // 추가 메세지 로드
  const getChatMessages = async (roomId) => {
    console.log("get Chat Messages 호출")
    try {
      const res = await getChatMessageList(roomId, {page: searchPage, size: 12})
      let newMessages = []
      if (res.data.length > 0) {
        newMessages = res.data
        setSearchPage((prevPage) => prevPage + 1)
        console.log("@@@@@@@@@@@@@@@@@@@@@")
        console.log(newMessages)
        return newMessages
      } else {
        setIsMessagesLeft(false)
      }
    } catch (error) {
      console.log("----- getChatMessages 실패 -----", error)
    }
  }

  const initChatConnection = (roomId, userId) => {
    const socket = new SockJS(REACT_APP_SERVER_URL + "/api/ws/chat")
    stompClient.current = Stomp.over(socket)
    let reconnect = 0

    const onConnect = () => {
      stompClient.current.subscribe(
        `/topic/chat/rooms/${roomId}`,
        (message) => {
          const newMessage = JSON.parse(message.body)
          setMessages((prevMessages) => [...prevMessages, newMessage])
        }
      )
    }

    // eslint-disable-next-line no-unused-vars
    const onError = (error) => {
      if (reconnect++ <= 5) {
        setTimeout(() => {
          initChatConnection(roomId, userId)
        }, 10000)
      }
    }

    stompClient.current.connect({}, onConnect, onError)
  }

  // 메시지가 로드될 때마다 스크롤다운
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
  }, [messages])

  // 현재 화면에서 ref 객체를 탐지하기 위한 inView 사용
  const {ref, inView} = useInView({})

  // inView값 변화를 감지해서 messages를 추가로 load시킴

  // inView 값이 변함을 탐지
  useEffect(() => {
    // inView 값이 true가 됐을 때,
    if (inView && isMessagesLeft) {
      setFetchMessages(true)
    }
  }, [inView])

  return (
    <>
      <div className="flex size-full flex-col divide-y">
        <div className="flex items-center space-x-2 px-3 py-1">
          <img
            src={opponentInfo.image ? opponentInfo.image : DefaultUserImage}
            alt=""
            className="size-12 rounded-full border-2"
          />
          <span className="font-bold">{opponentInfo.nickname}</span>
          <span>님과의 채팅</span>
        </div>
        <div className="grow overflow-auto p-3" id="chat-container">
          <div ref={ref} />
          {messages.map((message, index) => (
            <MessageItem
              ref={index === 0 ? ref : null}
              key={index}
              isMyMessage={Number(userId) === Number(message.senderId)}
              content={message.content}
              registTime={message.registTime}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex space-x-3 p-3">
          <input
            value={messageInput}
            onChange={changeHandler}
            onKeyDown={keyDownHandler}
            type="text"
            className="bg-stroke grow rounded-xl p-2 text-white"
            placeholder="입력하세요"
            id="message-input"
          />
          <button
            onClick={sendHandler}
            className="flex size-12 items-center justify-center rounded-full border-2"
          >
            <img src={SendIcon} alt="전송" className="size-12" />
          </button>
          <button className="flex size-12 items-center justify-center rounded-full border-2 ">
            <img src={CallIcon} alt="화상" className="size-12" />
          </button>
        </div>
      </div>
    </>
  )
}

export default ChatMainContainer
