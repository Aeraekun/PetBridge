package site.petbridge.domain.boardcomment.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import site.petbridge.domain.board.repository.BoardRepository;
import site.petbridge.domain.boardcomment.domain.BoardComment;
import site.petbridge.domain.boardcomment.dto.request.BoardCommentEditRequestDto;
import site.petbridge.domain.boardcomment.dto.request.BoardCommentRegistRequestDto;
import site.petbridge.domain.boardcomment.dto.response.BoardCommentResponseDto;
import site.petbridge.domain.boardcomment.repository.BoardCommentRepository;
import site.petbridge.domain.user.domain.User;
import site.petbridge.global.exception.ErrorCode;
import site.petbridge.global.exception.PetBridgeException;
import site.petbridge.util.AuthUtil;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardCommentServiceImpl implements BoardCommentService {

    private final AuthUtil authUtil;
    private final BoardCommentRepository boardCommentRepository;
    private final BoardRepository boardRepository;

    /**
     * 게시글 댓글 등록
     */
    @Transactional
    @Override
    public void registBoardComment(BoardCommentRegistRequestDto boardCommentRegistRequestDto) throws Exception {
        User user = authUtil.getAuthenticatedUser();

        // 존재하는 게시글 아니면 404
        if (!boardRepository.findByIdAndDisabledFalse(boardCommentRegistRequestDto.getBoardId()).isPresent()) {
            throw new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND);
        }

        BoardComment entity = boardCommentRegistRequestDto.toEntity(user.getId());
        boardCommentRepository.save(entity);
    }

    /**
     * 게시글 댓글 조회
     */
    @Override
    public List<BoardCommentResponseDto> getListBoardComment(int boardId, int page, int size) throws Exception {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "registTime"));
        Page<BoardCommentResponseDto> boardComments = boardCommentRepository.findByBoardIdAndDisabledFalse(boardId, pageable);

        return boardComments.getContent();
    }

    /**
     * 게시글 댓글 수정
     */
    @Transactional
    @Override
    public void editBoardComment(int id, BoardCommentEditRequestDto boardCommentEditRequestDto) throws Exception {
        User user = authUtil.getAuthenticatedUser();

        // 없거나 삭제된 게시글 댓글 404
        BoardComment entity = boardCommentRepository.findByIdAndDisabledFalse(id)
                .orElseThrow(() -> new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND));
        // 내 게시글 댓글 아님 403
        if (entity.getUserId() != user.getId()) {
            throw new PetBridgeException(ErrorCode.FORBIDDEN);
        }

        entity.update(boardCommentEditRequestDto);
        boardCommentRepository.save(entity);
    }

    /**
     * 게시글 댓글 삭제
     */
    @Transactional
    @Override
    public void removeBoardComment(int id) throws Exception {
        User user = authUtil.getAuthenticatedUser();

        // 없거나 삭제된 게시글 댓글 404
        BoardComment entity = boardCommentRepository.findByIdAndDisabledFalse(id)
                .orElseThrow(() -> new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND));
        // 내 게시글 댓글 아님 403
        if (entity.getUserId() != user.getId()) {
            throw new PetBridgeException(ErrorCode.FORBIDDEN);
        }

        entity.disable();
        boardCommentRepository.save(entity);
    }
}
