import axiosInstance from "api/axios-instance"

// 채팅방 목록 조회
export const getChatRoomList = (userId) => {
  try {
    const res = axiosInstance.get(`/chat/rooms/user/${userId}`)
    return res
  } catch (error) {
    return error
  }
}

// 채팅방 대화 내역 조회 - 각 채팅방 페이징 & 사이즈
export const getChatMessageList = async (roomId, searchParams) => {
  try {
    const res = await axiosInstance.get(`/chat/rooms/${roomId}`, {
      params: searchParams,
    })
    return res
  } catch (error) {
    return error
  }
}

// 메시지 전송 - 소켓
export const postChatMessage = async (ChatMessageRequestDto) => {
  try {
    const res = await axiosInstance.post(
      `/chat-messages`,
      ChatMessageRequestDto.roomId
    )
    return res
  } catch (error) {
    alert("메세지 전송에 실패했습니다.")
  }
}

// 메시지 수신 - 소켓

// 채팅방 생성
export const createChatRoom = (myId, opponentId) => {
  try {
    const res = axiosInstance.post(`/chat/rooms`, {
      myId: myId,
      opponentId: opponentId,
    })
    return res
  } catch (error) {
    return error
  }
}
