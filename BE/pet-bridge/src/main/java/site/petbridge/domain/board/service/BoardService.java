package site.petbridge.domain.board.service;

import org.springframework.web.multipart.MultipartFile;
import site.petbridge.domain.board.domain.enums.BoardType;
import site.petbridge.domain.board.dto.request.BoardEditRequestDto;
import site.petbridge.domain.board.dto.request.BoardRegistRequestDto;
import site.petbridge.domain.board.dto.response.BoardResponseDto;

import java.util.List;

public interface BoardService {
    void registBoard(BoardRegistRequestDto boardRegistRequestDto, MultipartFile thumbnailFile) throws Exception;

    List<BoardResponseDto> getListBoard(int page, int size, String userNickname, String title, BoardType type) throws Exception;

    List<BoardResponseDto> getListBoardByAnimalId(int animalId) throws Exception;

    BoardResponseDto getDetailBoard(int id) throws Exception;

    void editBoard(int id, BoardEditRequestDto boardEditRequestDto, MultipartFile thumbnailFile) throws Exception;

    void removeBoard(int id) throws Exception;
}
