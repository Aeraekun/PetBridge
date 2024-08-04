package site.petbridge.domain.contract.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import site.petbridge.domain.contract.domain.Contract;

public interface ContractRepository extends JpaRepository<Contract, Long> {

	Optional<List<Contract>> findByContractorIdOrContracteeId(int userId, int userId2);

	Optional<Contract> findById(int id);

	// 입양완료
	boolean existsByAnimalIdAndConfirmedTrue(int animalId);

	// 입양대기
	boolean existsByAnimalIdAndConfirmedFalse(int animalId);

	List<Contract> findAllByConfirmedTrue();

	List<Contract> findAllByConfirmedFalse();
}
