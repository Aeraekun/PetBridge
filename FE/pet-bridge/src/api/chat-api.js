import axiosInstance from "api/axios-instance"

// 채팅방 목록 조회
export const getChatRoomList = (userId) => {
  const res = axiosInstance.get(`/chat/${userId}`)

  // ChatRoomResponseDto
  const example = {
    id: "int",
    opponentId: "int",
    opponentImage: "string",
    opponentNickname: "string",
    recentMessage: "string",
    recentTime: "datetime",
  }
  example
  return res
}

// 채팅방 대화 내역 조회 - 각 채팅방
export const getChatMessageList = (roomId) => {
  const res = axiosInstance.get(`/chat-rooms/${roomId}`)

  //   ChatMessageResponseDto
  const example = {
    roomId: "int",
    senderId: "int",
    content: "string",
    registTime: "datetime",
  }
  example

  return res
}

// 메시지 전송 - 소켓
export const postChatMessage = async (messageForm) => {
  try {
    const res = await axiosInstance.post(`/chat-messages`, messageForm)
    return res
  } catch (error) {
    alert("메세지 전송에 실패했습니다.")
  }
}

// 메시지 수신 - 소켓

// 채팅방 생성
export const createChatRoom = (myId, opponentId) => {
  const res = axiosInstance.post(`/chat-rooms`, {
    myId: myId,
    opponentId: opponentId,
  })
  return res
}
