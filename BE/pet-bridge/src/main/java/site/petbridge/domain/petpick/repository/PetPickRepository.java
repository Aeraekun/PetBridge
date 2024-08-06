package site.petbridge.domain.petpick.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import site.petbridge.domain.petpick.domain.PetPick;
import site.petbridge.domain.petpick.dto.response.PetPickResponseDto;

import java.util.List;
import java.util.Optional;

public interface PetPickRepository extends JpaRepository<PetPick, Long> {

    // 삭제된 애들은 안 불러오게 (disabled = 1인 애들만)
    @Query(value = "SELECT * FROM petpicks WHERE disabled = 0 ORDER BY RAND() LIMIT 12", nativeQuery = true)
    List<PetPick> findRandomPetPicks();

    @Query("SELECT p FROM PetPick p WHERE p.userId = :userId AND p.disabled = false")
    Page<PetPick> findByUserId(int userId, Pageable pageable);

    @Query(value = "SELECT p FROM PetPick p JOIN PetPickLike pl ON p.id = pl.petPickId " +
            "WHERE pl.userId = :userId AND p.disabled = false")
    Page<PetPick> findLikedPetPicksByUserId(int userId, Pageable pageable);

    Optional<PetPick> findByIdAndDisabledFalse(int id);
}
