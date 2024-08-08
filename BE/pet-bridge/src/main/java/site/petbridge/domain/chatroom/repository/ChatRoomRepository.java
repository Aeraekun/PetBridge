package site.petbridge.domain.chatroom.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import site.petbridge.domain.chatroom.domain.ChatRoom;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

	ChatRoom findById(int id);

	Optional <ChatRoom> findBySenderIdAndReceiverId(int senderId, int receiverId);

	Optional <List<ChatRoom>> findBySenderIdOrReceiverId(int senderId, int receiverId);

}
