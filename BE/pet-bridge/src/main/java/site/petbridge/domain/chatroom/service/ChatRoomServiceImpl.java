package site.petbridge.domain.chatroom.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import site.petbridge.domain.chatmessage.domain.ChatMessage;
import site.petbridge.domain.chatmessage.dto.response.ChatMessageResponseDto;
import site.petbridge.domain.chatmessage.repository.ChatMessageRepository;
import site.petbridge.domain.chatroom.domain.ChatRoom;
import site.petbridge.domain.chatroom.dto.request.ChatRoomRequestDto;
import site.petbridge.domain.chatroom.dto.response.ChatRoomResponseDto;
import site.petbridge.domain.chatroom.repository.ChatRoomRepository;
import site.petbridge.domain.user.repository.UserRepository;

@Service
@Transactional
@RequiredArgsConstructor
public class ChatRoomServiceImpl implements ChatRoomService {

	private final ChatRoomRepository chatRoomRepository;
	private final UserRepository userRepository;
	private final ChatMessageRepository chatMessageRepository;

	@Override
	public Optional<List<ChatRoomResponseDto>> getListChatRoomByUserId(int userId) {
		Optional<List<ChatRoom>> chatRooms = chatRoomRepository.findBySenderIdOrReceiverId(userId, userId);

		return chatRooms.map(chatRoomList ->
			chatRoomList.stream()
				.map(chatRoom -> {
						int opponentId = (userId != chatRoom.getSenderId()) ? userId : chatRoom.getReceiverId();
						return ChatRoomResponseDto.TransferToChatRoomResponseDto(
							chatRoom, userRepository.findById(opponentId),
							chatMessageRepository.findFirstByRoomIdOrderByRegistTimeDesc(chatRoom.getId())
						);
					}
				)
				.collect(Collectors.toList())
		);
	}

	@Override
	public int RegistOrEnterChatRoom(ChatRoomRequestDto chatRoomRequestDto) {
		int senderId = Math.min(chatRoomRequestDto.getMyId(), chatRoomRequestDto.getOpponentId());
		int receiverId = Math.max(chatRoomRequestDto.getMyId(), chatRoomRequestDto.getOpponentId());
		Optional<ChatRoom> chatRoom = chatRoomRepository.findBySenderIdAndReceiverId(senderId, receiverId);
		if (chatRoom.isPresent()) {
			return chatRoom.get().getId();
		}
		ChatRoom chatRoomEntity = ChatRoom.builder()
			.senderId(senderId)
			.receiverId(receiverId)
			.build();
		return chatRoomRepository.save(chatRoomEntity).getId();
	}

}
