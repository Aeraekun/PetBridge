package site.petbridge.domain.boardcomment.service;

import site.petbridge.domain.boardcomment.dto.request.BoardCommentEditRequestDto;
import site.petbridge.domain.boardcomment.dto.request.BoardCommentRegistRequestDto;
import site.petbridge.domain.boardcomment.dto.response.BoardCommentResponseDto;

import java.util.List;

public interface BoardCommentService {

    void registBoardComment(BoardCommentRegistRequestDto boardCommentRegistRequestDto) throws Exception;

    List<BoardCommentResponseDto> getListBoardComment(int boardId, int page, int size) throws Exception;

    void editBoardComment(int id, BoardCommentEditRequestDto boardCommentEditRequestDto) throws Exception;

    void removeBoardComment(int id) throws Exception;
}
