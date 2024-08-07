package site.petbridge.domain.chatmessage.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import site.petbridge.domain.chatmessage.domain.ChatMessage;

public interface ChatMessageRepository extends MongoRepository<ChatMessage, String> {

	Optional<ChatMessage> findFirstByRoomIdOrderByRegistTimeDesc(int roomId);

	// roomId로 필터링하고, registTime으로 정렬하여 슬라이스된 결과를 반환
	Optional<List<ChatMessage>> findByRoomIdOrderByRegistTimeDesc(int roomId, int pageIndex, int pageSize);

	Optional<List<ChatMessage>> findByRoomId(int roomId, Pageable pageable);
	Optional<List<ChatMessage>> findByRoomId(int roomId);

	List<ChatMessage> findAll();


}
