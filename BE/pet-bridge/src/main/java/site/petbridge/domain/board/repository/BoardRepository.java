package site.petbridge.domain.board.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import site.petbridge.domain.board.domain.Board;

public interface BoardRepository extends JpaRepository<Board, Long>, BoardCustomRepository {
	Optional<Board> findById(int id);
}
