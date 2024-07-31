package site.petbridge.domain.contractcheck.dto.response;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ContractCheckResponseDto {

	private int contractId;
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

}
