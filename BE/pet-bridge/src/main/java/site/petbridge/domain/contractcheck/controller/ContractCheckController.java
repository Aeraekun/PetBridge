package site.petbridge.domain.contractcheck.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import site.petbridge.domain.contractcheck.dto.request.ContractCheckRequestDto;
import site.petbridge.domain.contractcheck.service.ContractCheckService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/contract-checks")
public class ContractCheckController {

	private final ContractCheckService contractCheckService;

	@PatchMapping("/{contractId}")
	public ResponseEntity<Void> editContractCheck(
		@PathVariable("contractId") int contractId,
		@RequestBody ContractCheckRequestDto contractCheckRequestDto) {
		if (contractCheckService.editContractCheck(contractId, contractCheckRequestDto) == 0) {
			return ResponseEntity.status(HttpStatus.CONFLICT).build();
		}
		return ResponseEntity.noContent().build();
	}

}



