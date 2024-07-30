package site.petbridge.domain.contractcheck.dto.request;

import java.time.LocalDate;

import lombok.Data;

@Data
public class ContractCheckRequestDto {

    private int contractId;
    private int month;

}
