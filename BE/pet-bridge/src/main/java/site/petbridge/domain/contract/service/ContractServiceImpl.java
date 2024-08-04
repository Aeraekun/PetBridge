package site.petbridge.domain.contract.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import site.petbridge.domain.animal.repository.AnimalRepository;
import site.petbridge.domain.contractcheck.domain.ContractCheck;
import site.petbridge.domain.contractcheck.repository.ContractCheckRepository;
import site.petbridge.domain.contract.domain.Contract;
import site.petbridge.domain.contract.dto.request.ContractRequestDto;
import site.petbridge.domain.contract.dto.response.ContractListResponseDto;
import site.petbridge.domain.contract.dto.response.ContractResponseDto;
import site.petbridge.domain.contract.repository.ContractRepository;
import site.petbridge.domain.user.repository.UserRepository;

@Service
@Transactional
@RequiredArgsConstructor
public class ContractServiceImpl implements ContractService {

	private final ContractRepository contractRepository;
	private final ContractCheckRepository contractCheckRepository;
	private final UserRepository userRepository;
	private final AnimalRepository animalRepository;

	@Override
	public Optional<List<ContractListResponseDto>> getListContractByUserId(int userId) {
		Optional<List<Contract>> contracts = contractRepository.findByContractorIdOrContracteeId(userId, userId);

		return contracts.map(contractList ->
			contractList.stream()
				.map(contract ->
					ContractListResponseDto.TransferToContractListResponseDto(
						contract,
						userRepository.findById(contract.getContractorId()).get(),
						userRepository.findById(contract.getContracteeId()).get(),
						animalRepository.findById((long) contract.getAnimalId()).get()
					)
				)
				.collect(Collectors.toList())
		);
	}

	@Override
	public Optional<ContractResponseDto> getDetailContract(int id) {
		Optional<Contract> opContract = contractRepository.findById(id);

		return opContract.map(contract -> ContractResponseDto.TransferToContractResponseDto(
			contract,
			userRepository.findById(contract.getContractorId()).get(),
			userRepository.findById(contract.getContracteeId()).get(),
			animalRepository.findById((long) contract.getAnimalId()).get(),
			contractCheckRepository.findByContractId(id)
		));

	}

	@Override
	public void registContract(ContractRequestDto contractRequestDto) {
		Contract contract = Contract.builder()
			.contractorId(contractRequestDto.getContractorId())
			.contracteeId(contractRequestDto.getContracteeId())
			.animalId(contractRequestDto.getAnimalId())
			.month(contractRequestDto.getMonth())
			.payment(contractRequestDto.getPayment())
			.content(contractRequestDto.getContent())
			.contractDate(contractRequestDto.getContractDate())
			.expirationDate(contractRequestDto.getExpirationDate())
			.build();

		Contract savedContract = contractRepository.save(contract);

		ContractCheck contractCheck = ContractCheck.builder()
			.contractId(savedContract.getId())
			.build();
		contractCheckRepository.save(contractCheck);
	}

	@Override
	public int confirmContract(int id) {
		Optional<Contract> opContract = contractRepository.findById(id);
		if (opContract.isPresent()) {
			opContract.map(contract -> {
				contract.setConfirmed(true);
				contractRepository.save(contract);
				return 1;
			});
		}
		return 0;
	}

	@Override
	public int removeContract(int id) {
		Optional<Contract> opContract = contractRepository.findById(id);
		if (opContract.isPresent()) {
			contractRepository.delete(opContract.get());
			return 1;
		}
		return 0;
	}
}
