package site.petbridge.domain.chatroom.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import site.petbridge.domain.chatmessage.domain.ChatMessage;
import site.petbridge.domain.chatroom.domain.ChatRoom;
import site.petbridge.domain.contractcheck.domain.ContractCheck;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

	Optional <ChatRoom> findBySenderIdAndReceiverId(int senderId, int receiverId);

	Optional <List<ChatRoom>> findBySenderIdOrReceiverId(int senderId, int receiverId);

}
