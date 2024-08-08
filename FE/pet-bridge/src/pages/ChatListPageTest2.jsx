import React, {useState, useEffect, useRef} from "react"
import SockJS from "sockjs-client"
// eslint-disable-next-line import/no-unresolved
import {Stomp} from "@stomp/stompjs"
import axios from "axios"

function ChatRoomList({onSelectRoom}) {
  const [rooms, setRooms] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [myId, setMyId] = useState(1) // 예시로 내 아이디를 설정
  // eslint-disable-next-line no-unused-vars
  const [opponentId, setOpponentId] = useState(null) // 상대방 아이디를 상태로 관리
  const [isModalOpen, setIsModalOpen] = useState(false) // 모달 창의 상태
  const [inputOpponentId, setInputOpponentId] = useState("") // 입력된 상대방 ID
  const stompClient = useRef(null)

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/chat/rooms/user/1"
        )
        const sortedRooms = response.data.sort((a, b) => {
          if (!a.recentTime) return -1 // a가 recentTime이 없으면 앞으로
          if (!b.recentTime) return 1 // b가 recentTime이 없으면 b가 앞으로
          return new Date(b.recentTime) - new Date(a.recentTime)
        })
        setRooms(sortedRooms)
      } catch (error) {
        console.error("채팅방 목록을 불러오는 데 실패했습니다:", error)
      }
    }

    fetchRooms()
    initializeConnection()

    return () => {
      if (stompClient.current) {
        stompClient.current.disconnect()
      }
    }
  }, [])

  const initializeConnection = () => {
    const socket = new SockJS("http://localhost:8080/ws/chat")
    stompClient.current = Stomp.over(socket)

    const onConnect = () => {
      stompClient.current.subscribe("/topic/chat/users/1", (response) => {
        console.log(response.body)

        const updatedRoom = JSON.parse(response.body)

        setRooms((prevRooms) => {
          // 방이 이미 목록에 있는지 확인
          const index = prevRooms.findIndex(
            (room) => room.id === updatedRoom.id
          )
          let newRooms
          if (index !== -1) {
            // 기존 방을 새로 들어온 방으로 대체
            newRooms = [...prevRooms]
            newRooms[index] = updatedRoom
          } else {
            // 새로운 방을 목록 맨 위에 추가
            newRooms = [updatedRoom, ...prevRooms]
          }

          // 최근 시간이 없는 방을 맨 위로 정렬
          const sortedRooms = newRooms.sort((a, b) => {
            if (!a.recentTime) return -1 // a의 recentTime이 없으면 a를 앞으로
            if (!b.recentTime) return 1 // b의 recentTime이 없으면 b를 앞으로
            return new Date(b.recentTime) - new Date(a.recentTime) // 최근 시간이 있으면 내림차순 정렬
          })

          return sortedRooms
        })
      })
    }

    const onError = (error) => {
      console.error("연결 오류:", error)
    }

    stompClient.current.connect({}, onConnect, onError)
  }

  const handleCreateRoom = async () => {
    try {
      if (!inputOpponentId) {
        console.error("상대방 아이디가 입력되지 않았습니다.")
        return
      }

      const data = {
        myId: myId,
        opponentId: inputOpponentId,
      }

      const response = await axios.post(
        "http://localhost:8080/api/chat/rooms",
        data
      )
      console.log(response.data)
      setIsModalOpen(false) // 모달 닫기
      setInputOpponentId("") // 입력 필드 초기화
    } catch (error) {
      console.error("채팅방 생성에 실패했습니다:", error)
    }
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">채팅방 목록</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          채팅방 생성
        </button>
      </div>
      <ul>
        {rooms.map((room) => (
          <li key={room.id} className="mb-4">
            <button
              className="flex w-full items-center rounded-lg bg-gray-100 p-3 hover:bg-gray-200"
              onClick={() => {
                onSelectRoom(room.id)
                setOpponentId(room.opponentId) // 상대방 아이디 설정
              }}
            >
              <img
                src={room.opponentImage}
                alt="상대방 이미지"
                className="mr-4 size-12 rounded-full"
              />
              <div className="flex flex-col text-left">
                <p className="text-sm font-semibold">방 번호: {room.id}</p>
                <p className="text-sm">상대방: {room.opponentNickname}</p>
                <p className="text-xs text-gray-600">
                  최근 메시지: {room.recentMessage}
                </p>
                <p className="text-xs text-gray-600">
                  최근 메시지 시간: {room.recentTime || "시간 없음"}
                </p>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {/* 채팅방 생성 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-bold">새 채팅방 생성</h2>
            <input
              type="text"
              className="mb-4 w-full rounded-lg border border-gray-300 p-2"
              placeholder="상대방 ID 입력"
              value={inputOpponentId}
              onChange={(e) => setInputOpponentId(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                className="mr-2 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                onClick={() => setIsModalOpen(false)}
              >
                취소
              </button>
              <button
                className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                onClick={handleCreateRoom}
              >
                생성
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatRoomList
