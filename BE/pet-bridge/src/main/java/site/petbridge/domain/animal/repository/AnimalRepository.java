package site.petbridge.domain.animal.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import site.petbridge.domain.animal.domain.Animal;

public interface AnimalRepository extends JpaRepository<Animal, Long> {

    Optional<Animal> findById(int id);

    Optional<List<Animal>> findByUserId(int userId);

    Optional<List<Animal>> findByUserIdAndProcessState(int userId, String processState);

}
