package site.petbridge.domain.board.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import site.petbridge.domain.board.domain.Board;
import site.petbridge.domain.board.dto.response.BoardResponseDto;

public interface BoardRepository extends JpaRepository<Board, Long>, BoardCustomRepository {
    Optional<Board> findById(int id);
}
