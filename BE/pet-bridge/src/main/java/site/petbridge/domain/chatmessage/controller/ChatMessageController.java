package site.petbridge.domain.chatmessage.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;

import lombok.RequiredArgsConstructor;
import site.petbridge.domain.chatmessage.dto.request.ChatMessageRequestDto;
import site.petbridge.domain.chatmessage.dto.response.ChatMessageResponseDto;
import site.petbridge.domain.chatmessage.service.ChatMessageService;
import site.petbridge.domain.chatroom.dto.response.ChatRoomResponseDto;
import site.petbridge.domain.chatroom.service.ChatRoomService;

@Controller
@RequiredArgsConstructor
public class ChatMessageController {

	private final ChatMessageService chatMessageService;
	private final ChatRoomService chatRoomService;

	@MessageMapping("/api/chat-messages/{roomId}")
	@SendTo("/api/topic/messages/{roomId}") // 클라이언트가 수신할 경로
	public ChatMessageResponseDto registChatMessage(
		@DestinationVariable int roomId,
		@Payload ChatMessageRequestDto chatMessageRequestDto) {
		chatMessageRequestDto.setRoomId(roomId);
		// 메시지 등록 전에 로그 추가
		System.out.println("Received message for room " + roomId + ": " + chatMessageRequestDto.getContent());
		getListChatRoomByUserId(chatMessageRequestDto.getOpponentId());
		return chatMessageService.registChatMessage(chatMessageRequestDto);
	}

	@MessageMapping("/api/chat-users/{userId}")
	@SendTo("/api/topic/users/{userId}")
	public ResponseEntity<Optional<List<ChatRoomResponseDto>>> getListChatRoomByUserId(@PathVariable int userId) {
		System.out.println("getListChatRoomByUserId: " + userId);
		Optional<List<ChatRoomResponseDto>> chatRoomResponseDtos = chatRoomService.getListChatRoomByUserId(userId);
		return ResponseEntity.status(HttpStatus.OK).body(chatRoomResponseDtos);
	}

}




