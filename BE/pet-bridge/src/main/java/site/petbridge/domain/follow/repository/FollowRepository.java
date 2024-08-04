package site.petbridge.domain.follow.repository;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import site.petbridge.domain.animal.domain.Animal;
import site.petbridge.domain.follow.domain.Follow;
import site.petbridge.domain.petpicklike.domain.PetPickLike;

import java.util.List;
import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Long> {

    @Query("SELECT f FROM Follow f WHERE f.userId = :userId AND f.animalId = :animalId")
    Optional<Follow> findByUserIdAndAnimalId(@Param("userId") Integer userId, @Param("animalId") Integer animalId);

    @Query("SELECT COUNT(f) > 0 FROM Follow f WHERE f.userId = :userId AND f.animalId = :animalId")
    boolean existsByUserIdAndAnimalId(@Param("userId") int userId, @Param("animalId") int animalId);

    @Query("SELECT a FROM Animal a JOIN Follow f ON a.id = f.animalId WHERE f.userId = :userId AND a.disabled = false ORDER BY a.id DESC")
    List<Animal> findFollowedAnimalsByUserId(@Param("userId") int userId);
}