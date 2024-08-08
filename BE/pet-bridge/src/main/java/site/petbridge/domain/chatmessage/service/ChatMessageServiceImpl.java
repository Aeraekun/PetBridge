package site.petbridge.domain.chatmessage.service;

import java.time.LocalDateTime;
import java.util.Collections;
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
import site.petbridge.domain.user.domain.User;
import site.petbridge.global.exception.ErrorCode;
import site.petbridge.global.exception.PetBridgeException;
import site.petbridge.util.AuthUtil;

@Service
@Transactional
@RequiredArgsConstructor
public class ChatMessageServiceImpl implements ChatMessageService {

	private final ChatMessageRepository chatMessageRepository;
	private final AuthUtil authUtil;

	@Override
	public ChatMessageResponseDto registChatMessage(ChatMessageRequestDto chatMessageRequestDto) throws Exception{
		User user = authUtil.getAuthenticatedUser();
		if(user.getId()!= chatMessageRequestDto.getSenderId()){
			throw new PetBridgeException(ErrorCode.UNAUTHORIZED);
		}

		ChatMessage chatMessage = chatMessageRepository.save(ChatMessage.builder()
			.roomId(chatMessageRequestDto.getRoomId())
			.senderId(chatMessageRequestDto.getSenderId())
			.content(chatMessageRequestDto.getContent())
			.registTime(LocalDateTime.now())
			.build());

		return ChatMessageResponseDto.transferToChatMessageResponseDto(chatMessage);
	}

	@Override
	public Optional<List<ChatMessageResponseDto>> getListChatMessageByRoomId(int roomId, int page, int size) {
		PageRequest pageable = PageRequest.of(page, size);
		Optional<List<ChatMessage>> chatMessageResponseDtos = chatMessageRepository.findByRoomIdOrderByRegistTimeDesc(roomId, pageable);
		// Optional<List<ChatMessage>> chatMessageResponseDtos = chatMessageRepository.findByRoomId(roomId);
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
				.collect(Collectors.collectingAndThen(Collectors.toList(), list -> {
					Collections.reverse(list); // Reverse the list
					return list;
				})));
	}

}

