package site.petbridge.domain.boardcomment.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import site.petbridge.domain.boardcomment.domain.BoardComment;

public interface BoardCommentRepository extends JpaRepository<BoardComment, Long> {

    Optional<BoardComment> findById(int id);

    Optional<List<BoardComment>> findByBoardId(int boardId);

}
