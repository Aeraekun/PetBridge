package site.petbridge.domain.board.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.petbridge.domain.board.domain.Board;

import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {
    Optional<Board> findByIdAndDisabledFalse(int id);
}
