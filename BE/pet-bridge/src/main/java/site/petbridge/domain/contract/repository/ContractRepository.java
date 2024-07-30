package site.petbridge.domain.contract.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import site.petbridge.domain.contract.domain.Contract;

public interface ContractRepository extends JpaRepository<Contract, Long> {

	Optional<List<Contract>> findByContractorId(int contractorId);

	Optional<List<Contract>> findByContracteeId(int contracteeId);

	Optional<List<Contract>>findByContractorIdOrContracteeId(int userId, int userId2);

	Optional<Contract> findById(int id);

}
