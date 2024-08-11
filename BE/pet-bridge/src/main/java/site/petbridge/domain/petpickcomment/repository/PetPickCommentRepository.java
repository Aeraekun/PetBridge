package site.petbridge.domain.petpickcomment.repository;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import site.petbridge.domain.boardcomment.domain.BoardComment;
import site.petbridge.domain.boardcomment.dto.response.BoardCommentResponseDto;
import site.petbridge.domain.petpickcomment.domain.PetPickComment;
import site.petbridge.domain.petpickcomment.dto.response.PetPickCommentResponseDto;

import java.util.List;
import java.util.Optional;

public interface PetPickCommentRepository extends JpaRepository<PetPickComment, Long> {

    Optional<PetPickComment> findByIdAndDisabledFalse(int id);

    @Query("SELECT new site.petbridge.domain.petpickcomment.dto.response.PetPickCommentResponseDto(c, u.nickname, u.image) " +
            "FROM PetPickComment c JOIN User u ON c.userId = u.id " +
            "WHERE c.petPickId = :petPickId AND c.disabled = false")
    Page<PetPickCommentResponseDto> findByPetPickIdAndDisabledFalse(@Param("petPickId") int petPickId, Pageable pageable);
}
