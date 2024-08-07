package site.petbridge.domain.chatmessage.dto.response;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import site.petbridge.domain.chatmessage.domain.ChatMessage;

@Data
@Builder
@AllArgsConstructor
public class ChatMessageResponseDto {

    private int roomId;
    private int senderId;
    private String content;
    private LocalDateTime registTime;

    public static ChatMessageResponseDto transferToChatMessageResponseDto(ChatMessage chatMessage) {
        return ChatMessageResponseDto.builder()
            .roomId(chatMessage.getRoomId())
            .senderId(chatMessage.getSenderId())
            .content(chatMessage.getContent())
            .registTime(chatMessage.getRegistTime())
            .build();
    }

}
