package site.petbridge.domain.board.service;

import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;
import site.petbridge.domain.board.domain.enums.BoardType;
import site.petbridge.domain.board.dto.request.BoardEditRequestDto;
import site.petbridge.domain.board.dto.request.BoardRegistRequestDto;
import site.petbridge.domain.board.dto.response.BoardResponseDto;

import java.util.List;

public interface BoardService {
    void registBoard(BoardRegistRequestDto boardRegistRequestDto, MultipartFile thumbnailFile) throws Exception;

    Page<BoardResponseDto> getListBoard(int page, int size, String userNickname, String title, BoardType type) throws Exception;

    Page<BoardResponseDto> getListLostBoardByLocation(int page, int size, double lat, double lon) throws Exception;

    Page<BoardResponseDto> getListBoardByAnimalId(int page, int size, int animalId) throws Exception;

    BoardResponseDto getDetailBoard(int id) throws Exception;

    void editBoard(int id, BoardEditRequestDto boardEditRequestDto, MultipartFile thumbnailFile) throws Exception;

    void removeBoard(int id) throws Exception;

    String registImage(MultipartFile thumbnailFile) throws Exception;
}
