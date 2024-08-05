package site.petbridge.domain.contract.domain;

import static site.petbridge.domain.contract.domain.enums.Status.*;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
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
@Table(name = "contracts")
@AllArgsConstructor
public class Contract {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(name = "contractor_id")
	private int contractorId;

	@Column(name = "contractee_id")
	private int contracteeId;

	@Column(name = "animal_id")
	private int animalId;

	private int month;

	private int payment;

	private String content;

	@Column(name = "contract_date")
	private LocalDate contractDate;

	@Column(name = "expiration_date")
	private LocalDate  expirationDate;

	@Builder.Default
	private String status = PRE_CONTRACT.getKey();

}
