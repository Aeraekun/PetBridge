package site.petbridge.domain.chatmessage.service;

import java.util.List;
import java.util.Optional;

import site.petbridge.domain.chatmessage.dto.request.ChatMessageRequestDto;
import site.petbridge.domain.chatmessage.dto.response.ChatMessageResponseDto;

public interface ChatMessageService {

	ChatMessageResponseDto registChatMessage(ChatMessageRequestDto chatMessageRequestDto);

	// Optional<List<ChatMessageResponseDto>> getListChatMessage(int roomId, Pageable pageable);

	Optional<List<ChatMessageResponseDto>> getListChatMessageByRoomId(int roomId);
}
