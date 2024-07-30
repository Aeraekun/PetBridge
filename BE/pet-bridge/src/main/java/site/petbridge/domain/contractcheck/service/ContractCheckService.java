package site.petbridge.domain.contractcheck.service;

import site.petbridge.domain.contractcheck.dto.request.ContractCheckRequestDto;
import site.petbridge.domain.contractcheck.dto.response.ContractCheckResponseDto;

public interface ContractCheckService {

	ContractCheckResponseDto getDetailContractCheck(int contractId);

	int editContractCheck(int contractId, ContractCheckRequestDto contractCheckRequestDto);

}
