package site.petbridge.domain.chatroom.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import site.petbridge.domain.chatmessage.dto.response.ChatMessageResponseDto;
import site.petbridge.domain.chatmessage.service.ChatMessageService;
import site.petbridge.domain.chatroom.dto.request.ChatRoomRequestDto;
import site.petbridge.domain.chatroom.dto.response.ChatRoomResponseDto;
import site.petbridge.domain.chatroom.service.ChatRoomService;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chat")
public class ChatRoomController {

	private final ChatRoomService chatRoomService;
	private final ChatMessageService chatMessageService;

	@GetMapping("/rooms/user/{userId}")
	public ResponseEntity<Optional<List<ChatRoomResponseDto>>> getListChatRoomByUserId(@PathVariable int userId) throws Exception {

		System.out.println("getListChatRoomByUserId: " + userId);
		Optional<List<ChatRoomResponseDto>> chatRoomResponseDtos = chatRoomService.getListChatRoomByUserId(userId);
		return ResponseEntity.status(HttpStatus.OK).body(chatRoomResponseDtos);
	}

	@PostMapping("/rooms")
	public ResponseEntity<Integer> RegistOrEnterChatRoom(
		@RequestBody ChatRoomRequestDto chatRoomRequestDto) throws Exception {
		return ResponseEntity.status(HttpStatus.OK).body(chatRoomService.RegistOrEnterChatRoom(chatRoomRequestDto));
	}

	@GetMapping("/rooms/{roomId}")
	public Optional<List<ChatMessageResponseDto>> getListChatMessageByRoomId(
		@PathVariable int roomId,
		@RequestParam(name = "page", required = false, defaultValue = "0") int page,
		@RequestParam(name = "size", required = false, defaultValue = "12") int size) {
		return chatMessageService.getListChatMessageByRoomId(roomId, page, size);
	}

}
