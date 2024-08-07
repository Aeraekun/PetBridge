package site.petbridge.domain.chatmessage.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import site.petbridge.domain.chatmessage.domain.ChatMessage;
import site.petbridge.domain.chatmessage.dto.request.ChatMessageRequestDto;
import site.petbridge.domain.chatmessage.dto.response.ChatMessageResponseDto;
import site.petbridge.domain.chatmessage.repository.ChatMessageRepository;

@Service
@Transactional
@RequiredArgsConstructor
public class ChatMessageServiceImpl implements ChatMessageService {

	private final ChatMessageRepository chatMessageRepository;

	@Override
	public ChatMessageResponseDto registChatMessage(ChatMessageRequestDto chatMessageRequestDto) {
		ChatMessage chatMessage = chatMessageRepository.save(ChatMessage.builder()
			.roomId(chatMessageRequestDto.getRoomId())
			.senderId(chatMessageRequestDto.getSenderId())
			.content(chatMessageRequestDto.getContent())
			.build());

		return ChatMessageResponseDto.builder()
			.roomId(chatMessage.getRoomId())
			.senderId(chatMessage.getSenderId())
			.content(chatMessage.getContent())
			.registTime(chatMessage.getRegistTime())
			.build();
	}

	// @Override
	// public Optional<List<ChatMessageResponseDto>> getListChatMessage(int roomId, Pageable pageable) {
	// 	Optional<List<ChatMessage>> chatMessages = chatMessageRepository.findByRoomIdOrderByRegistTimeDesc(roomId, pageable);
	//
	// 	return chatMessages.map(chatMessageList ->
	// 		chatMessageList.stream()
	// 			.map(ChatMessageResponseDto::transferToChatMessageResponseDto
	// 			)
	// 			.collect(Collectors.toList())
	// 	);
	// }

	@Override
	public Optional<List<ChatMessageResponseDto>> getListChatMessageByRoomId(int roomId) {
		// PageRequest pageable = PageRequest.of(pageIndex, pageSize);
		// Optional<List<ChatMessage>> chatMessageResponseDtos = chatMessageRepository.findByRoomId(roomId, pageable);
		Optional<List<ChatMessage>> chatMessageResponseDtos = chatMessageRepository.findByRoomId(roomId);
		System.out.println("chatMessageResponseDtos: " + chatMessageResponseDtos);
		return chatMessageResponseDtos.map(chatMessageList ->
			chatMessageList.stream()
				.map(chatMessage ->
					ChatMessageResponseDto.builder()
						.roomId(chatMessage.getRoomId())
						.senderId(chatMessage.getSenderId())
						.content(chatMessage.getContent())
						.registTime(chatMessage.getRegistTime())
						.build()

				)
				.collect(Collectors.toList())
		);
	}
}
