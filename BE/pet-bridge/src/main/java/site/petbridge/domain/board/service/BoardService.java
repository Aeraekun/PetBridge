package site.petbridge.domain.board.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import site.petbridge.domain.board.dto.request.BoardAddRequestDto;
import site.petbridge.domain.board.dto.request.BoardEditRequestDto;
import site.petbridge.domain.board.dto.response.BoardResponseDto;

public interface BoardService {

    Optional<List<BoardResponseDto>> getListBoard();
    Optional<BoardResponseDto> getDetailBoard(int id);
    void registBoard(BoardAddRequestDto boardAddRequestDto, MultipartFile file) throws Exception;
    int editBoard(int id, BoardEditRequestDto boardEditRequestDto, MultipartFile file) throws Exception;
    int removeBoard(int boardId);

}
