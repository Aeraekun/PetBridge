package site.petbridge.domain.petpickcomment.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import site.petbridge.domain.petpickcomment.domain.PetPickComment;
import site.petbridge.domain.petpickcomment.dto.response.PetPickCommentResponseDto;

import java.util.List;

public interface PetPickCommentRepository extends JpaRepository<PetPickComment, Long> {

    @Query("SELECT new site.petbridge.domain.petpickcomment.dto.response.PetPickCommentResponseDto(c, u.nickname, u.image) " +
            "FROM PetPickComment c JOIN User u ON c.userId = u.id " +
            "WHERE c.petPickId = :petPickId AND c.disabled = false")
    Page<PetPickCommentResponseDto> findByPetPickId(Long petPickId, Pageable pageable);

    List<PetPickComment> findByPetPickIdAndDisabledFalse(int petPickId);
}
