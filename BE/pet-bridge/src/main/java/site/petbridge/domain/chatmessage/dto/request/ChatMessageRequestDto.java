package site.petbridge.domain.chatmessage.dto.request;

import lombok.Data;

@Data
public class ChatMessageRequestDto {

    private int roomId;
    private int senderId;
    private String content;
    private int opponentId;

}
