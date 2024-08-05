package site.petbridge.domain.animal.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import site.petbridge.domain.animal.domain.Animal;

import java.util.Optional;

public interface AnimalRepository extends JpaRepository<Animal, Long> {
    Optional<Animal> findByIdAndDisabledFalse(int id);

    Page<Animal> findBySpeciesAndCareAddrContainingAndDisabledFalse(String species, String careAddr, Pageable pageable);

    Page<Animal> findBySpeciesAndDisabledFalse(String species, Pageable pageable);

    Page<Animal> findByCareAddrContainingAndDisabledFalse(String careAddr, Pageable pageable);

    Page<Animal> findByUserIdAndDisabledFalse(int userId, Pageable pageable);

}
