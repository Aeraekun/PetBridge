package site.petbridge.domain.contract.dto.request;

import lombok.Data;

@Data
public class ContractEditRequestDto {

    private int id;
    private int userId;
    private String status;

}
