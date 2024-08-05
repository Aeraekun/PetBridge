package site.petbridge.domain.board.repository;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import site.petbridge.domain.board.domain.Board;

import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long>, CustomBoardRepository {
    Optional<Board> findByIdAndDisabledFalse(int id);

    Optional<Board> findById(int id);
}
