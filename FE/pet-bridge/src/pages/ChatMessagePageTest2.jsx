import React, {useState, useEffect, useRef} from "react"
import axios from "axios"
import SockJS from "sockjs-client"
// eslint-disable-next-line import/no-unresolved
import {Stomp} from "@stomp/stompjs"

function ChatRoom() {
  const [roomId, setRoomId] = useState("")
  const [room, setRoom] = useState({})
  const [senderId, setSender] = useState("")
  const [content, setContent] = useState("")
  const [opponentId, setOpponent] = useState("")
  const [messages] = useState([])
  const stompClient = useRef(null)

  useEffect(() => {
    // 로컬 스토리지에서 저장된 값 대신 하드코딩된 값을 사용
    const storedRoomId = 1
    const storedSender = 1
    const storedOpponent = 2
    setRoomId(storedRoomId)
    setSender(storedSender)
    setOpponent(storedOpponent)
    findRoom(storedRoomId)
    initializeConnection(storedRoomId, storedSender)

    // 컴포넌트가 언마운트될 때 연결 해제
    return () => {
      if (stompClient.current) {
        stompClient.current.disconnect()
      }
    }
  }, [])

  const findRoom = (roomId) => {
    axios
      .get(`http://localhost:8080/api/chat/rooms/${roomId}`)
      .then((response) => {
        console.log("방 검색 결과")
        console.log(response.data)
        console.dir(response.data)
        setRoom(response.data)
      })
      .catch((error) => {
        console.error("방 정보를 불러오는 데 실패했습니다:", error)
      })
  }

  const initializeConnection = (roomId, sender) => {
    const socket = new SockJS("http://localhost:8080/ws/chat") // SockJS 사용
    stompClient.current = Stomp.over(socket)
    let reconnect = 0

    const onConnect = () => {
      stompClient.current.subscribe(`/topic/chat/rooms/${roomId}`, () => {})
    }

    // eslint-disable-next-line no-unused-vars
    const onError = (error) => {
      if (reconnect++ <= 5) {
        setTimeout(() => {
          console.log("connection reconnect")
          initializeConnection(roomId, sender)
        }, 10 * 1000)
      }
    }

    stompClient.current.connect({}, onConnect, onError)
  }

  const sendMessage = () => {
    if (stompClient.current && content) {
      const msg = {
        roomId,
        senderId,
        content,
        opponentId,
      }
      stompClient.current.send(
        `/app/api/chat/messages`,
        {},
        JSON.stringify(msg)
      )
      setContent("")
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div>
        <button
          onClick={() => (window.location.href = "/chat/room")}
          className="mb-4 rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
        >
          돌아가기
        </button>
      </div>
      <div>
        <h2 className="mb-4 text-xl font-bold">{room.name}</h2>
      </div>
      <div className="mb-4 flex items-center">
        <label htmlFor="messageInput" className="mr-2 font-medium">
          내용
        </label>
        <input
          id="messageInput"
          type="text"
          className="grow rounded border border-gray-300 p-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") sendMessage()
          }}
        />
        <button
          className="ml-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          type="button"
          onClick={sendMessage}
        >
          보내기
        </button>
      </div>
      <ul className="divide-y divide-gray-200 rounded border border-gray-300">
        {messages.map((msg, index) => (
          <li
            className="flex items-center justify-between p-2 hover:bg-gray-100"
            key={index}
          >
            <span className="mr-2 font-bold">{msg.sender}</span>
            <span>{msg.message}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ChatRoom
