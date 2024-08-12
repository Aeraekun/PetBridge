package site.petbridge.domain.board.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import site.petbridge.domain.board.domain.enums.BoardType;
import site.petbridge.domain.board.dto.response.BoardResponseDto;

import java.util.List;

public interface CustomBoardRepository {
    Page<BoardResponseDto> findAllByUserNickNameAndTypeAndTitleContains(String userNickName, String title, BoardType type, Pageable pageable);

    BoardResponseDto getDetailBoardById(int id);

    Page<BoardResponseDto> findAllByAnimalIdAndDisabledFalse(int animalId, Pageable pageable);

    List<BoardResponseDto> findAllByLocationFiltering(double lat, double lon);
}
