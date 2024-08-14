package site.petbridge.domain.chatmessage.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ChatMessageRequestDto {

    private int roomId;
    private int senderId;
    private String content;

}
