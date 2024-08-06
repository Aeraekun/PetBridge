package site.petbridge.domain.board.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import site.petbridge.domain.board.dto.response.BoardResponseDto;

public interface CustomBoardRepository {
    Page<BoardResponseDto> findAllByUserNickNameAndTitleContains(String userNickName, String title, Pageable pageable);

    BoardResponseDto getDetailBoardById(int id);
}
