package site.petbridge.domain.contract.service;

import java.util.List;
import java.util.Optional;

import site.petbridge.domain.contract.dto.request.ContractRequestDto;
import site.petbridge.domain.contract.dto.response.ContractListResponseDto;
import site.petbridge.domain.contract.dto.response.ContractResponseDto;

public interface ContractService {
	Optional<List<ContractListResponseDto>> getListContractByUserId(int userId);

	Optional<ContractResponseDto> getDetailContract(int id);

	void registContract(ContractRequestDto contractRequestDto);

	int confirmContract(int id);

	int removeContract(int id);

}
