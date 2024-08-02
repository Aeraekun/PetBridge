package site.petbridge.domain.petpicklike.repository;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import site.petbridge.domain.petpicklike.domain.PetPickLike;
import site.petbridge.domain.petpicklike.dto.response.PetPickLikeResponseDto;

import java.util.List;
import java.util.Optional;

public interface PetPickLikeRepository extends JpaRepository<PetPickLike, Long> {

    @Query("SELECT p FROM PetPickLike p WHERE p.userId = :userId AND p.petPickId = :petPickId")
    Optional<PetPickLike> findByUserIdAndPetPickId(@Param("userId") Integer userId, @Param("petPickId") Integer petPickId);
}
