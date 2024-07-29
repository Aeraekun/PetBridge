package site.petbridge.domain.boardcomment.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import site.petbridge.domain.boardcomment.domain.BoardComment;
import site.petbridge.domain.boardcomment.dto.request.BoardCommentRequestDto;
import site.petbridge.domain.boardcomment.dto.response.BoardCommentResponseDto;
import site.petbridge.domain.boardcomment.repository.BoardCommentRepository;
import site.petbridge.domain.user.repository.UserRepository;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardCommentServiceImpl implements BoardCommentService {

    private final BoardCommentRepository boardCommentRepository;
	private final UserRepository userRepository;

	@Override
	public Optional<List<BoardCommentResponseDto>> getListBoardComment(int boardId) {
		Optional<List<BoardComment>> boardComments = boardCommentRepository.findByBoardId(boardId);

		return boardComments.map(commentList ->
			commentList.stream()
				.map(boardComment ->
					BoardCommentResponseDto.TransferToBoardCommentResponseDto(
						boardComment, userRepository.findById(boardComment.getUserId()).get()
					)
				)
				.collect(Collectors.toList())
		);
	}

	@Override
	public void registBoardComment(BoardCommentRequestDto boardCommentRequestDto) {
		BoardComment transferToBoardComment = BoardComment.builder()
			.boardId(boardCommentRequestDto.getBoardId())
			.userId(boardCommentRequestDto.getUserId())
			.content(boardCommentRequestDto.getContent())
			.build();

		boardCommentRepository.save(transferToBoardComment);
	}

	@Override
	public int editBoardComment(int id, BoardCommentRequestDto boardCommentRequestDto) {
		BoardComment boardComment = boardCommentRepository.findById(id).orElse(null);
		if(boardComment != null) {
			boardComment.setUserId(boardCommentRequestDto.getUserId());
			boardComment.setContent(boardCommentRequestDto.getContent());
			boardCommentRepository.save(boardComment);
			return 1;
		}
		return 0;
	}

	@Override
	public int removeBoardComment(int id) {
		BoardComment boardComment = boardCommentRepository.findById(id).orElse(null);
		if(boardComment != null) {
			boardComment.setDisabled(true);
			boardCommentRepository.save(boardComment);
			return 1;
		}
		return 0;
	}
}
