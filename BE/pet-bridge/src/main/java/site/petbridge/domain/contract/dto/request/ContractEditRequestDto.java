package site.petbridge.domain.contract.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ContractEditRequestDto {

    private int id;
    private int userId;
    private String status;

}
