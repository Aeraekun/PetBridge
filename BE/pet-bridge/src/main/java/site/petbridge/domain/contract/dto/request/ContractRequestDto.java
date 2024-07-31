package site.petbridge.domain.contract.dto.request;

import java.time.LocalDate;

import lombok.Data;

@Data
public class ContractRequestDto {

    private int contractorId;
    private int contracteeId;
    private int animalId;
    private int month;
    private int payment;
    private String content;
    private LocalDate contractDate;
    private LocalDate  expirationDate;

}
