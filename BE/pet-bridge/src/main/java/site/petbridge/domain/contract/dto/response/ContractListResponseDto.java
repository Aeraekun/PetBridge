package site.petbridge.domain.contract.dto.response;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import site.petbridge.domain.animal.domain.Animal;
import site.petbridge.domain.contract.domain.Contract;
import site.petbridge.domain.user.domain.User;

@Data
@Builder
@AllArgsConstructor
public class ContractListResponseDto {

	private int id;
	private int contractorId;
	private int contracteeId;
	private int animalId;
	private int month;
	private int payment;
	private String content;
	private LocalDate contractDate;
	private LocalDate expirationDate;
	private String status;

	private String contractorNickname;
	private String contracteeNickname;

	private String animalName;
	private String animalImage;

	public static ContractListResponseDto TransferToContractListResponseDto(Contract contract, User contractor,
		User contractee, Animal animal) {
		return ContractListResponseDto.builder()
			.id(contract.getId())
			.contractorId(contract.getContractorId())
			.contracteeId(contract.getContracteeId())
			.animalId(contract.getAnimalId())
			.month(contract.getMonth())
			.payment(contract.getPayment())
			.content(contract.getContent())
			.contractDate(contract.getContractDate())
			.expirationDate(contract.getExpirationDate())
			.status(contract.getStatus())
			.contractorNickname(contractor.getNickname())
			.contracteeNickname(contractee.getNickname())
			.animalName(animal.getName())
			.animalImage(animal.getFilename())
			.build();
	}

}
