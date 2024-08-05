package site.petbridge.domain.contract.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import site.petbridge.domain.animal.repository.AnimalRepository;
import site.petbridge.domain.contract.domain.Contract;
import site.petbridge.domain.contract.domain.enums.Status;
import site.petbridge.domain.contract.dto.request.ContractEditRequestDto;
import site.petbridge.domain.contract.dto.request.ContractRequestDto;
import site.petbridge.domain.contract.dto.response.ContractListResponseDto;
import site.petbridge.domain.contract.dto.response.ContractResponseDto;
import site.petbridge.domain.contract.repository.ContractRepository;
import site.petbridge.domain.contractcheck.domain.ContractCheck;
import site.petbridge.domain.contractcheck.repository.ContractCheckRepository;
import site.petbridge.domain.user.domain.User;
import site.petbridge.domain.user.domain.enums.Role;
import site.petbridge.domain.user.repository.UserRepository;
import site.petbridge.global.exception.ErrorCode;
import site.petbridge.global.exception.PetBridgeException;
import site.petbridge.util.AuthUtil;

@Service
@Transactional
@RequiredArgsConstructor
public class ContractServiceImpl implements ContractService {

	private final ContractRepository contractRepository;
	private final ContractCheckRepository contractCheckRepository;
	private final UserRepository userRepository;
	private final AnimalRepository animalRepository;
	private final AuthUtil authUtil;

	@Override
	public Optional<List<ContractListResponseDto>> getListContractByUserId(int userId) throws Exception {
		User user = authUtil.getAuthenticatedUser();
		if (user.getId() != userId) {
			throw new PetBridgeException(ErrorCode.UNAUTHORIZED);
		}

		Optional<List<Contract>> contracts = contractRepository.findByContractorIdOrContracteeId(userId, userId);

		return contracts.map(contractList ->
			contractList.stream()
				.map(contract ->
					ContractListResponseDto.TransferToContractListResponseDto(
						contract,
						userRepository.findById(contract.getContractorId()).get(),
						userRepository.findById(contract.getContracteeId()).get(),
						animalRepository.findById((long)contract.getAnimalId()).get()
					)
				)
				.collect(Collectors.toList())
		);
	}

	@Override
	public Optional<ContractResponseDto> getDetailContract(int id) throws Exception {
		User user = authUtil.getAuthenticatedUser();

		Optional<Contract> opContract = contractRepository.findById(id);
		if (opContract.isPresent()) {
			if (user.getId() != opContract.get().getContractorId() && user.getId() != opContract.get().getContracteeId()
				&& user.getRole() != Role.ADMIN) {
				throw new PetBridgeException(ErrorCode.UNAUTHORIZED);
			}
		}

		return opContract.map(contract -> ContractResponseDto.TransferToContractResponseDto(
			contract,
			userRepository.findById(contract.getContractorId()).get(),
			userRepository.findById(contract.getContracteeId()).get(),
			animalRepository.findById((long)contract.getAnimalId()).get(),
			contractCheckRepository.findByContractId(id)
		));

	}

	@Override
	public void registContract(ContractRequestDto contractRequestDto) throws Exception {
		User user = authUtil.getAuthenticatedUser();
		if (user.getId() != contractRequestDto.getContractorId()) {
			throw new PetBridgeException(ErrorCode.UNAUTHORIZED);
		}

		LocalDate today = LocalDate.now();

		Contract contract = Contract.builder()
			.contractorId(contractRequestDto.getContractorId())
			.contracteeId(contractRequestDto.getContracteeId())
			.animalId(contractRequestDto.getAnimalId())
			.month(contractRequestDto.getMonth())
			.payment(contractRequestDto.getPayment())
			.content(contractRequestDto.getContent())
			.contractDate(today)
			.expirationDate(today.plusMonths(2))
			.build();

		Contract savedContract = contractRepository.save(contract);

		ContractCheck contractCheck = ContractCheck.builder()
			.contractId(savedContract.getId())
			.build();
		contractCheckRepository.save(contractCheck);
	}

	@Override
	public int editContract(int id, ContractEditRequestDto contractEditRequestDto) throws Exception {
		User user = authUtil.getAuthenticatedUser();

		Optional<Contract> opContract = contractRepository.findById(id);
		if (opContract.isEmpty()) {
			return 0;
		}
		Contract contract = opContract.get();
		String currentStatus = contract.getStatus();

		if (user.getId() != contract.getContractorId() && user.getId() != contract.getContracteeId()
			&& user.getRole() != Role.ADMIN) {
			throw new PetBridgeException(ErrorCode.UNAUTHORIZED);
		}
		if (contract.getStatus().equals("계약전") && contractEditRequestDto.getStatus().equals("계약완료")) {
			contract.setStatus(Status.CONTRACT_COMPLETE.getKey());
		}
		if (contract.getStatus().equals("계약완료") && contractEditRequestDto.getStatus().equals("환급대기")) {
			contract.setStatus(Status.REFUND_PENDING.getKey());
		}
		if (contract.getStatus().equals("환급대기") && contractEditRequestDto.getStatus().equals("환급완료")) {
			contract.setStatus(Status.REFUND_COMPLETE.getKey());
		}
		if (currentStatus.equals(contract.getStatus())) {
			return 0;
		}
		contractRepository.save(opContract.get());
		return 1;
	}

	@Override
	public int removeContract(int id) throws Exception {
		User user = authUtil.getAuthenticatedUser();

		Optional<Contract> opContract = contractRepository.findById(id);
		if (opContract.isEmpty()) {
			return 0;
		}
		Contract contract = opContract.get();

		if (user.getId() != contract.getContractorId() && user.getId() != contract.getContracteeId()
			&& user.getRole() != Role.ADMIN) {
			throw new PetBridgeException(ErrorCode.UNAUTHORIZED);
		}

		contractRepository.delete(opContract.get());
		return 1;
	}
}



