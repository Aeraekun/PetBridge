import React, {useState} from "react"
import ChatRoomList from "./ChatListPageTest2"
import ChatRoom from "./ChatMessagePageTest2"

function ChatPage() {
  const [selectedRoomId, setSelectedRoomId] = useState(null)

  return (
    <div className="flex h-screen">
      {/* 왼쪽에 채팅방 목록 표시 */}
      <div className="flex-1 overflow-y-auto border-r border-gray-200">
        <ChatRoomList onSelectRoom={setSelectedRoomId} />
      </div>

      {/* 오른쪽에 선택된 채팅방 표시 */}
      <div className="flex-2 overflow-y-auto">
        {selectedRoomId ? (
          <ChatRoom roomId={selectedRoomId} />
        ) : (
          <div className="p-4">
            <h2>채팅방을 선택하세요</h2>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatPage
