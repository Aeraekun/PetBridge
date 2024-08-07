import React, {useState, useEffect, useRef} from "react"
// eslint-disable-next-line import/no-unresolved
import SockJS from "sockjs-client"
// import * as StompJs from "@stomp/stompjs";

// eslint-disable-next-line import/no-unresolved
import {Client} from "@stomp/stompjs"

const WebSocketChat = () => {
  const [username, setUsername] = useState("")
  const [messageContent, setMessageContent] = useState("")
  const [messages, setMessages] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const roomId = 1
  const skip = useRef(0)
  const limit = 10
  const messageContainerRef = useRef()
  const stompClientRef = useRef(null)

  useEffect(() => {
    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate()
      }
    }
  }, [])

  const connect = () => {
    const socket = new SockJS("http://localhost:8080/friendChat")
    const client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(str),
      onConnect: () => {
        console.log("Connected")
        console.dir("socket: ", socket)
        console.log("socket2: ", socket)
        client.subscribe(`/chat-room/messages/${roomId}`, (message) => {
          const content = JSON.parse(message.body).content
          setMessages((prevMessages) => [...prevMessages, content])
          scrollToBottom()
        })
        client.subscribe(`/api/chat-room/loadMessages/${roomId}`, (message) => {
          const slice = JSON.parse(message.body)
          const newMessages = slice.content
          if (newMessages.length === 0) {
            setHasMore(false)
          } else {
            setMessages((prevMessages) => [
              ...newMessages.map((msg) => msg.content),
              ...prevMessages,
            ])
            skip.current += limit
          }
          setHasMore(!slice.last)
        })
        fetchMoreData(client)
      },
    })

    client.activate()
    stompClientRef.current = client
  }

  const disconnect = () => {
    if (stompClientRef.current) {
      stompClientRef.current.deactivate()
      stompClientRef.current = null
    }
    console.log("Disconnected")
  }

  const sendMessage = () => {
    if (stompClientRef.current) {
      console.log("Sending message:", messageContent) // 메시지 내용 로그
      const chatMessageRequestDto = {
        senderId: username,
        content: messageContent,
      }
      stompClientRef.current.publish({
        destination: "/api/chat-messages/${roomId}",
        body: JSON.stringify(chatMessageRequestDto),
      })
      console.log(`Message sent to destination: /api/chat-messages/${roomId}`) // 메시지 전송 후 로그
      setMessageContent("")
    } else {
      console.log("Stomp client not connected") // 연결 상태 확인
    }
  }

  const fetchMoreData = (client) => {
    if (client && hasMore) {
      client.publish({
        destination: `/chat/loadMessages/${roomId}`,
        body: JSON.stringify({
          pageIndex: skip.current,
          pageSize: limit,
        }),
      })
    }
  }

  const handleScroll = () => {
    if (messageContainerRef.current.scrollTop === 0 && hasMore) {
      fetchMoreData(stompClientRef.current)
    }
  }

  const scrollToBottom = () => {
    messageContainerRef.current.scrollTop =
      messageContainerRef.current.scrollHeight
  }

  return (
    <div>
      <div>
        <input
          type="text"
          id="username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={connect}>Connect</button>
        <button onClick={disconnect}>Disconnect</button>
        <br />
        <input
          type="text"
          id="messageContent"
          placeholder="Enter your message"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div
        id="messageContainer"
        style={{
          height: "40vh",
          overflow: "auto",
          border: "1px solid black",
          padding: "10px",
        }}
        ref={messageContainerRef}
        onScroll={handleScroll}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className="message"
            style={{padding: "5px", borderBottom: "1px solid #ddd"}}
          >
            {message}
          </div>
        ))}
      </div>
    </div>
  )
}

export default WebSocketChat
