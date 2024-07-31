package site.petbridge.domain.contract.dto.response;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import site.petbridge.domain.animal.domain.Animal;
import site.petbridge.domain.contractcheck.domain.ContractCheck;
import site.petbridge.domain.contract.domain.Contract;
import site.petbridge.domain.user.domain.User;

@Data
@Builder
@AllArgsConstructor
public class ContractResponseDto {

	private int id;
	private int contractorId;
	private int contracteeId;
	private int animalId;
	private int month;
	private int payment;
	private String content;
	private LocalDate contractDate;
	private LocalDate expirationDate;
	private boolean confirmed;
	private boolean refunded;

	private String contractorNickname;
	private String contracteeNickname;

	private String animalName;
	private String animalImage;

	private LocalDate month1;
	private LocalDate month2;
	private LocalDate month3;
	private LocalDate month4;
	private LocalDate month5;
	private LocalDate month6;
	private LocalDate month7;
	private LocalDate month8;
	private LocalDate month9;
	private LocalDate month10;
	private LocalDate month11;
	private LocalDate month12;


	public static ContractResponseDto TransferToContractResponseDto(Contract contract, User contractor, User contractee, Animal animal, ContractCheck contractCheck){
		return ContractResponseDto.builder()
			.id(contract.getId())
			.contractorId(contract.getContractorId())
			.contracteeId(contract.getContracteeId())
			.animalId(contract.getAnimalId())
			.month(contract.getMonth())
			.payment(contract.getPayment())
			.content(contract.getContent())
			.contractDate(contract.getContractDate())
			.expirationDate(contract.getExpirationDate())
			.confirmed(contract.isConfirmed())
			.refunded(contract.isRefunded())
			.contractorNickname(contractor.getNickname())
			.contracteeNickname(contractee.getNickname())
			.animalName(animal.getName())
			.animalImage(animal.getFilename())
			.month1(contractCheck.getMonth1())
			.month2(contractCheck.getMonth2())
			.month3(contractCheck.getMonth3())
			.month4(contractCheck.getMonth4())
			.month5(contractCheck.getMonth5())
			.month6(contractCheck.getMonth6())
			.month7(contractCheck.getMonth7())
			.month8(contractCheck.getMonth8())
			.month9(contractCheck.getMonth9())
			.month10(contractCheck.getMonth10())
			.month11(contractCheck.getMonth11())
			.month12(contractCheck.getMonth12())
			.build();
	}

}
