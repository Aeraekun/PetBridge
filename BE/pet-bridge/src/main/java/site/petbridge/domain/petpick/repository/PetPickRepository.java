package site.petbridge.domain.petpick.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import site.petbridge.domain.petpick.domain.PetPick;
import site.petbridge.domain.petpick.dto.response.PetPickResponseDto;

import java.util.List;
import java.util.Optional;

public interface PetPickRepository extends JpaRepository<PetPick, Long> {

    @Query(value = "SELECT * FROM petpicks WHERE disabled = 0 ORDER BY RAND() LIMIT 12", nativeQuery = true)
    List<PetPick> findRandomPetPicks();
}
