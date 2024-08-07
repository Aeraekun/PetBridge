import React, {useState, useEffect} from "react"
import axios from "axios"

function ChatApp() {
  const [roomName, setRoomName] = useState("")
  const [chatRooms, setChatRooms] = useState([])

  useEffect(() => {
    findAllRooms()
  }, [])

  // 로그인 유저 id로 채팅방 받아오기
  const findAllRooms = () => {
    axios
      .get("http://localhost:8080/api/chat/rooms/user/1")
      .then((response) => {
        console.log(response.data)
        console.dir(response.data)
        setChatRooms(response.data)
      })
  }

  const createRoom = () => {
    if (roomName === "") {
      alert("방 제목을 입력해 주십시요.")
      return
    } else {
      const params = new URLSearchParams()
      params.append("name", roomName)
      axios
        .post("http://localhost:8080/api/chat/rooms/${roomId}", params)
        .then((response) => {
          alert(`${response.data.roomName} 방 개설에 성공하였습니다.`)
          setRoomName("")
          findAllRooms()
        })
        .catch(() => {
          alert("채팅방 개설에 실패하였습니다.")
        })
    }
  }

  const enterRoom = (roomId) => {
    const sender = prompt("대화명을 입력해 주세요.")
    if (sender !== "") {
      localStorage.setItem("wschat.sender", sender)
      localStorage.setItem("wschat.roomId", roomId)
      window.location.href = `/chat/room/enter/${roomId}`
    }
  }

  return (
    <div className="container mx-auto p-4" id="app">
      <div className="mb-4">
        <h3 className="text-lg font-bold">채팅방 리스트</h3>
      </div>
      <div className="mb-4 flex items-center">
        <label htmlFor="roomName" className="mr-2 font-medium">
          방제목
        </label>
        <input
          id="roomName"
          type="text"
          className="mr-2 grow rounded border border-gray-300 p-2"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && createRoom()}
        />
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          type="button"
          onClick={createRoom}
        >
          채팅방 개설
        </button>
      </div>
      <ul className="list-none">
        {chatRooms.map((item) => (
          <li key={item.roomId} className="mb-2">
            <button
              className="w-full cursor-pointer rounded border bg-white p-2 text-left hover:bg-gray-100"
              onClick={() => enterRoom(item.roomId)}
              onKeyPress={(e) => {
                if (e.key === "Enter") enterRoom(item.roomId)
              }}
            >
              {item.roomName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ChatApp
