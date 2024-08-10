package site.petbridge.domain.chatmessage.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import site.petbridge.domain.chatmessage.dto.request.ChatMessageRequestDto;
import site.petbridge.domain.chatmessage.dto.response.ChatMessageResponseDto;
import site.petbridge.domain.chatmessage.service.ChatMessageService;
import site.petbridge.domain.chatroom.service.ChatRoomService;

@RestController
@RequiredArgsConstructor
public class ChatMessageController {

	private final ChatMessageService chatMessageService;
	private final ChatRoomService chatRoomService;
	private final SimpMessageSendingOperations sendingOperations;

	@MessageMapping("/messages")
	public void registChatMessage(
		ChatMessageRequestDto chatMessageRequestDto) throws Exception {

		int roomId = chatMessageRequestDto.getRoomId();
		chatMessageRequestDto.setRoomId(roomId);

		// 메시지 등록 전에 로그 추가
		System.out.println("Received message for room " + roomId + ": " + chatMessageRequestDto.getContent());

		ChatMessageResponseDto chatMessageResponseDto = chatMessageService.registChatMessage(chatMessageRequestDto);
		sendingOperations.convertAndSend("/topic/chat/rooms/" + roomId,
			chatMessageResponseDto);

		chatRoomService.sendNewChatRoomInfo(roomId, chatMessageResponseDto);

	}

}
