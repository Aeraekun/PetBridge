package site.petbridge.domain.contract.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import site.petbridge.domain.contract.domain.Contract;

public interface ContractRepository extends JpaRepository<Contract, Long> {

	Optional<List<Contract>> findByContractorIdOrContracteeId(int userId, int userId2);

	Optional<Contract> findById(int id);

	// // 입양완료
	// boolean existsByAnimalIdAndConfirmedTrue(int animalId);
	//
	// // 입양대기
	// boolean existsByAnimalIdAndConfirmedFalse(int animalId);
	//
	// List<Contract> findAllByConfirmedTrue();
	//
	// List<Contract> findAllByConfirmedFalse();

	// 입양 완료: animalId 기반으로 검색하고, status가 "계약전"이 아닌 경우
	boolean existsByAnimalIdAndStatusNot(int animalId, String status);

	// 입양 대기: contract_check 테이블에서 animalId로 검사
	@Query("SELECT CASE WHEN COUNT(c) > 0 THEN TRUE ELSE FALSE END FROM Contract c WHERE c.animalId = :animalId")
	boolean existsByAnimalIdInContract(@Param("animalId") int animalId);

	List<Contract> findByStatus(String status);

	List<Contract> findByStatusNot(String status);
}
