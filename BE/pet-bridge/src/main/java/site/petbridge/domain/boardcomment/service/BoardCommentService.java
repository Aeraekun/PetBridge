package site.petbridge.domain.boardcomment.service;

import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import site.petbridge.domain.board.dto.request.BoardAddRequestDto;
import site.petbridge.domain.board.dto.response.BoardResponseDto;
import site.petbridge.domain.boardcomment.dto.request.BoardCommentRequestDto;
import site.petbridge.domain.boardcomment.dto.response.BoardCommentResponseDto;

public interface BoardCommentService {
    Optional<List<BoardCommentResponseDto>> getListBoardComment(int boardId);
    void registBoardComment(BoardCommentRequestDto boardCommentRequestDto);
    int editBoardComment(int id, BoardCommentRequestDto boardCommentRequestDto);
    int removeBoardComment(int id);

}
