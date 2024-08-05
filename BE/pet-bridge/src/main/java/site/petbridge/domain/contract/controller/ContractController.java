package site.petbridge.domain.contract.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import site.petbridge.domain.contract.dto.request.ContractEditRequestDto;
import site.petbridge.domain.contract.dto.request.ContractRequestDto;
import site.petbridge.domain.contract.dto.response.ContractListResponseDto;
import site.petbridge.domain.contract.dto.response.ContractResponseDto;
import site.petbridge.domain.contract.service.ContractService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/contracts")
public class ContractController {

	private final ContractService contractService;

	@GetMapping("/user/{userId}")
	public ResponseEntity<List<ContractListResponseDto>> getListContract(@PathVariable("userId") int userId) throws
		Exception {
		return contractService.getListContractByUserId(userId)
			.map(ResponseEntity::ok)
			.orElseGet(() -> ResponseEntity.status(HttpStatus.NO_CONTENT).build());
	}

	@GetMapping("/{id}")
	public ResponseEntity<ContractResponseDto> getDetailContract(@PathVariable("id") int id) throws Exception {
		return contractService.getDetailContract(id)
			.map(ResponseEntity::ok)
			.orElseGet(() -> ResponseEntity.status(HttpStatus.NO_CONTENT).build());
	}

	@PostMapping
	public ResponseEntity<Void> registContract(
		@RequestBody ContractRequestDto contractRequestDto) throws Exception {
		contractService.registContract(contractRequestDto);
		return ResponseEntity.status((HttpStatus.CREATED)).build();
	}

	@PatchMapping("/{id}")
	public ResponseEntity<Void> editContract(@PathVariable("id") int id,
		@RequestBody ContractEditRequestDto contractEditRequestDto) throws Exception {
		if (contractService.editContract(id, contractEditRequestDto) == 0) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
		return ResponseEntity.noContent().build();
	}

	@DeleteMapping("/{id}/disable")
	public ResponseEntity<Void> removeContract(@PathVariable("id") int id) throws Exception {
		contractService.removeContract(id);
		return ResponseEntity.noContent().build();
	}

}



