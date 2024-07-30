package site.petbridge.domain.contractcheck.domain;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Builder
@Table(name = "contract_checks")
@AllArgsConstructor
public class ContractCheck {

	@Id
	@Column(name = "contract_id")
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
