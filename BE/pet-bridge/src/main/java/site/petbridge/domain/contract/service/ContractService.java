package site.petbridge.domain.contract.service;

import java.util.List;
import java.util.Optional;

import site.petbridge.domain.contract.dto.request.ContractEditRequestDto;
import site.petbridge.domain.contract.dto.request.ContractRequestDto;
import site.petbridge.domain.contract.dto.response.ContractListResponseDto;
import site.petbridge.domain.contract.dto.response.ContractResponseDto;

public interface ContractService {
	Optional<List<ContractListResponseDto>> getListContractByUserId(int userId) throws Exception;

	Optional<ContractResponseDto> getDetailContract(int id) throws Exception;

	void registContract(ContractRequestDto contractRequestDto) throws Exception;

	int editContract(int id, ContractEditRequestDto contractEditRequestDto) throws Exception;

	int removeContract(int id) throws Exception;

}
