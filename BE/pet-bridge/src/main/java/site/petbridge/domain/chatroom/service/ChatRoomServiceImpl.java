package site.petbridge.domain.chatroom.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import site.petbridge.domain.chatmessage.dto.response.ChatMessageResponseDto;
import site.petbridge.domain.chatmessage.repository.ChatMessageRepository;
import site.petbridge.domain.chatroom.domain.ChatRoom;
import site.petbridge.domain.chatroom.dto.request.ChatRoomRequestDto;
import site.petbridge.domain.chatroom.dto.response.ChatRoomResponseDto;
import site.petbridge.domain.chatroom.repository.ChatRoomRepository;
import site.petbridge.domain.user.domain.User;
import site.petbridge.domain.user.repository.UserRepository;
import site.petbridge.global.exception.ErrorCode;
import site.petbridge.global.exception.PetBridgeException;
import site.petbridge.util.AuthUtil;

@Service
@Transactional
@RequiredArgsConstructor
public class ChatRoomServiceImpl implements ChatRoomService {

	private final ChatRoomRepository chatRoomRepository;
	private final UserRepository userRepository;
	private final ChatMessageRepository chatMessageRepository;
	private final SimpMessageSendingOperations sendingOperations;
	private final AuthUtil authUtil;

	@Override
	public Optional<List<ChatRoomResponseDto>> getListChatRoomByUserId(int userId) throws Exception{
		User user = authUtil.getAuthenticatedUser();
		if(user.getId()!= userId){
			throw new PetBridgeException(ErrorCode.UNAUTHORIZED);
		}

		Optional<List<ChatRoom>> chatRooms = chatRoomRepository.findBySenderIdOrReceiverId(userId, userId);

		return chatRooms.map(chatRoomList ->
			chatRoomList.stream()
				.map(chatRoom -> {
						System.out.println(userId);
						System.out.println("senderId: " + chatRoom.getSenderId());
						System.out.println("receiverId: " + chatRoom.getReceiverId());
						int opponentId =
							(userId != chatRoom.getSenderId()) ? chatRoom.getSenderId() : chatRoom.getReceiverId();
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
	public int RegistOrEnterChatRoom(ChatRoomRequestDto chatRoomRequestDto) throws Exception{
		User user = authUtil.getAuthenticatedUser();
		if(user.getId()!= chatRoomRequestDto.getMyId()){
			throw new PetBridgeException(ErrorCode.UNAUTHORIZED);
		}

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

		chatRoomEntity = chatRoomRepository.save(chatRoomEntity);

		ChatRoomResponseDto newRoomToSender = ChatRoomResponseDto.TransferToChatRoomResponseDto(
			chatRoomEntity, userRepository.findById(receiverId));

		ChatRoomResponseDto newRoomToReceiver = ChatRoomResponseDto.TransferToChatRoomResponseDto(
			chatRoomEntity, userRepository.findById(senderId));

		System.out.println("작성자 전송: " + "/topic/chat/users/" + senderId);
		sendingOperations.convertAndSend("/topic/chat/users/" + senderId,
			newRoomToSender);

		System.out.println("수신자 전송: " + "/topic/chat/users/" + receiverId);
		sendingOperations.convertAndSend("/topic/chat/users/" + receiverId,
			newRoomToReceiver);

		return chatRoomEntity.getId();
	}

	@Override
	public void sendNewChatRoomInfo(int roomId, ChatMessageResponseDto chatMessageResponseDto) throws Exception{
		ChatRoom chatRoom = chatRoomRepository.findById(roomId);
		int senderId = chatRoom.getSenderId();
		int receiverId = chatRoom.getReceiverId();

		ChatRoomResponseDto newRoomToSender = ChatRoomResponseDto.TransferToChatRoomResponseDto(
			chatRoom, userRepository.findById(receiverId), chatMessageResponseDto);

		ChatRoomResponseDto newRoomToReceiver = ChatRoomResponseDto.TransferToChatRoomResponseDto(
			chatRoom, userRepository.findById(senderId), chatMessageResponseDto);

		System.out.println("작성자 전송: " + "/topic/chat/users/" + senderId);
		sendingOperations.convertAndSend("/topic/chat/users/" + senderId,
			newRoomToSender);

		System.out.println("수신자 전송: " + "/topic/chat/users/" + receiverId);
		sendingOperations.convertAndSend("/topic/chat/users/" + receiverId,
			newRoomToReceiver);

	}

}
