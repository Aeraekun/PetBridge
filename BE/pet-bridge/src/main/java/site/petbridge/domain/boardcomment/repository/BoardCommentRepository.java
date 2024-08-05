package site.petbridge.domain.boardcomment.repository;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import site.petbridge.domain.boardcomment.domain.BoardComment;
import site.petbridge.domain.boardcomment.dto.response.BoardCommentResponseDto;

import java.util.Optional;

public interface BoardCommentRepository extends JpaRepository<BoardComment, Long> {

    Optional<BoardComment> findByIdAndDisabledFalse(int id);

    @Query("SELECT new site.petbridge.domain.boardcomment.dto.response.BoardCommentResponseDto(c, u.nickname, u.image) " +
            "FROM BoardComment c JOIN User u ON c.userId = u.id " +
            "WHERE c.boardId = :boardId AND c.disabled = false")
    Page<BoardCommentResponseDto> findByBoardIdAndDisabledFalse(@Param("boardId") int boardId, Pageable pageable);
}
