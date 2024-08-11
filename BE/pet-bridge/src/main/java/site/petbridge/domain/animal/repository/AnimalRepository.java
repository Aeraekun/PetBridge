package site.petbridge.domain.animal.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import site.petbridge.domain.animal.domain.Animal;

import java.util.Optional;

public interface AnimalRepository extends JpaRepository<Animal, Long>, QuerydslPredicateExecutor<Animal>, CustomAnimalRepository {
    Optional<Animal> findByIdAndDisabledFalse(int id);

    Page<Animal> findBySpeciesAndCareAddrContainingAndDisabledFalse(String species, String careAddr, Pageable pageable);

    Page<Animal> findBySpeciesAndDisabledFalse(String species, Pageable pageable);

    Page<Animal> findByCareAddrContainingAndDisabledFalse(String careAddr, Pageable pageable);

    Page<Animal> findBySpeciesAndKindCdContainingAndCareAddrContainingAndDisabledFalse(
            String species, String kindCd, String careAddr, Pageable pageable);

    Page<Animal> findBySpeciesAndKindCdContainingAndDisabledFalse(
            String species, String kindCd, Pageable pageable);

    Page<Animal> findByKindCdContainingAndCareAddrContainingAndDisabledFalse(
            String kindCd, String careAddr, Pageable pageable);

    Page<Animal> findByKindCdContainingAndDisabledFalse(String kindCd, Pageable pageable);

    Page<Animal> findByUserIdAndDisabledFalse(int userId, Pageable pageable);

    Optional<Animal> findById(int id);

    Page<Animal> findAllByDisabledFalse(Pageable pageable);

    boolean existsByIdAndDisabledFalse(int id);
}
