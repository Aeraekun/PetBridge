import React, {useState, useEffect, useRef} from "react"
import axios from "axios"
import SockJS from "sockjs-client"
// eslint-disable-next-line import/no-unresolved
import {Stomp} from "@stomp/stompjs"

function ChatRoom({roomId}) {
  const [room, setRoom] = useState({})
  // eslint-disable-next-line no-unused-vars
  const [senderId, setSenderId] = useState(1) // 하드코딩된 사용자 ID
  const [content, setContent] = useState("")
  // eslint-disable-next-line no-unused-vars
  const [opponentId, setOpponent] = useState(2) // 하드코딩된 상대방 ID
  const [messages, setMessages] = useState([])
  const stompClient = useRef(null)

  useEffect(() => {
    findRoom(roomId)
    initializeConnection(roomId, senderId)

    return () => {
      if (stompClient.current) {
        stompClient.current.disconnect()
      }
    }
  }, [roomId])

  const findRoom = (roomId) => {
    axios
      .get(`http://localhost:8080/api/chat/rooms/${roomId}`)
      .then((response) => {
        setRoom(response.data)
        setMessages(response.data)
      })
      .catch((error) => {
        console.error("방 정보를 불러오는 데 실패했습니다:", error)
      })
  }

  const initializeConnection = (roomId, senderId) => {
    const socket = new SockJS("http://localhost:8080/ws/chat")
    stompClient.current = Stomp.over(socket)
    let reconnect = 0

    const onConnect = () => {
      stompClient.current.subscribe(
        `/topic/chat/rooms/${roomId}`,
        (message) => {
          const newMessage = JSON.parse(message.body)
          setMessages((prevMessages) => [...prevMessages, newMessage]) // 새로운 메시지를 추가
        }
      )
    }

    // eslint-disable-next-line no-unused-vars
    const onError = (error) => {
      if (reconnect++ <= 5) {
        setTimeout(() => {
          initializeConnection(roomId, senderId)
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
    <div className="p-4">
      <h2 className="mb-4 text-lg font-bold">{room.name || "채팅방"}</h2>
      <div className="mb-4">
        <input
          type="text"
          className="mb-2 w-full rounded-lg border border-gray-300 p-2"
          placeholder="메시지를 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") sendMessage()
          }}
        />
        <button
          className="w-full rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600"
          onClick={sendMessage}
        >
          보내기
        </button>
      </div>
      <ul className="space-y-4">
        {messages.map((msg, index) => (
          <li key={index} className="rounded-lg border border-gray-200 p-2">
            <div className="flex justify-between">
              <span className="font-bold">{msg.sender}</span>
              <span className="text-sm text-gray-600">
                {new Date(msg.registTime).toLocaleString()}
              </span>
            </div>
            <p>{msg.content}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ChatRoom
