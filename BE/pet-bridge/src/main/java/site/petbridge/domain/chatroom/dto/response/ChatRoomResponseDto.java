package site.petbridge.domain.chatroom.dto.response;

import java.time.LocalDateTime;
import java.util.Optional;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import site.petbridge.domain.chatmessage.domain.ChatMessage;
import site.petbridge.domain.chatmessage.dto.response.ChatMessageResponseDto;
import site.petbridge.domain.chatroom.domain.ChatRoom;
import site.petbridge.domain.user.domain.User;

@Data
@Builder
@AllArgsConstructor
public class ChatRoomResponseDto {

	private int id;
	private int opponentId;
	private String opponentImage;
	private String opponentNickname;
	private String recentMessage;
	private LocalDateTime recentTime;

	public static ChatRoomResponseDto TransferToChatRoomResponseDto(ChatRoom chatRoom, Optional<User> opponent) {
		return ChatRoomResponseDto.builder()
			.id(chatRoom.getId())
			.opponentId(opponent.get().getId())
			.opponentImage(opponent.get().getImage())
			.opponentNickname(opponent.get().getNickname())
			.recentMessage(null)
			.recentTime(null)
			.build();
	}

	public static ChatRoomResponseDto TransferToChatRoomResponseDto(ChatRoom chatRoom, Optional<User> opponent,
		Optional<ChatMessage> chatMessage) {
		return ChatRoomResponseDto.builder()
			.id(chatRoom.getId())
			.opponentId(opponent.get().getId())
			.opponentImage(opponent.get().getImage())
			.opponentNickname(opponent.get().getNickname())
			.recentMessage(chatMessage.map(ChatMessage::getContent).orElse(null))
			.recentTime(chatMessage.map(ChatMessage::getRegistTime).orElse(null))
			.build();
	}

	public static ChatRoomResponseDto TransferToChatRoomResponseDto(ChatRoom chatRoom, Optional<User> opponent,
		ChatMessageResponseDto chatMessageResponseDto) {
		return ChatRoomResponseDto.builder()
			.id(chatRoom.getId())
			.opponentId(opponent.get().getId())
			.opponentImage(opponent.get().getImage())
			.opponentNickname(opponent.get().getNickname())
			.recentMessage(chatMessageResponseDto.getContent())
			.recentTime(chatMessageResponseDto.getRegistTime())
			.build();

	}

}
