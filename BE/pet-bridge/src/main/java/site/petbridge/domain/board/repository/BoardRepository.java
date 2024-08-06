package site.petbridge.domain.board.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import site.petbridge.domain.board.domain.Board;
import site.petbridge.domain.board.domain.enums.BoardType;

import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long>, CustomBoardRepository {
    Optional<Board> findByIdAndDisabledFalse(int id);

    Optional<Board> findById(int id);
}
