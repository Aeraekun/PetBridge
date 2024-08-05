package site.petbridge.domain.chatmessage.domain;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Document(collection = "chat_messages")
public class ChatMessage {

	@Id
	private ObjectId id;
	private int roomId;
	private int senderId;
	private String content;
	private Timestamp registTime;


}
