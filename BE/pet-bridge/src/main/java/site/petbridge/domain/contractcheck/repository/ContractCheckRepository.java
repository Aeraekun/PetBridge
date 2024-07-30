package site.petbridge.domain.contractcheck.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import site.petbridge.domain.contractcheck.domain.ContractCheck;

public interface ContractCheckRepository extends JpaRepository<ContractCheck, Long> {

	ContractCheck findByContractId(int contractId);

}
