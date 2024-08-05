package site.petbridge.domain.chatroom.service;

import java.util.List;
import java.util.Optional;

import site.petbridge.domain.chatmessage.dto.response.ChatMessageResponseDto;
import site.petbridge.domain.chatroom.dto.request.ChatRoomRequestDto;
import site.petbridge.domain.chatroom.dto.response.ChatRoomResponseDto;

public interface ChatRoomService {

	Optional<List<ChatRoomResponseDto>> getListChatRoomByUserId(int userId);

	int RegistOrEnterChatRoom(ChatRoomRequestDto chatRoomRequestDto);

}
