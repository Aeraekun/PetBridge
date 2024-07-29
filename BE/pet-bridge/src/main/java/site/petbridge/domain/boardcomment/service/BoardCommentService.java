package site.petbridge.domain.boardcomment.service;

import java.util.List;
import java.util.Optional;

import site.petbridge.domain.boardcomment.dto.request.BoardCommentRequestDto;
import site.petbridge.domain.boardcomment.dto.response.BoardCommentResponseDto;

public interface BoardCommentService {
    Optional<List<BoardCommentResponseDto>> getListBoardComment(int boardId);
    void registBoardComment(BoardCommentRequestDto boardCommentRequestDto);
    int editBoardComment(int id, BoardCommentRequestDto boardCommentRequestDto);
    int removeBoardComment(int id);

}
