package site.petbridge.domain.chatroom.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ChatRoomRequestDto {

	private int myId;
	private int opponentId;

}
