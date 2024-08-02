package site.petbridge.domain.petpicklike.dto.response;

import lombok.Getter;
import site.petbridge.domain.petpicklike.domain.PetPickLike;

@Getter
public class PetPickLikeResponseDto {
    private int id;
    private int userId;
    private int petPickId;

    public PetPickLikeResponseDto(PetPickLike entity) {
        this.id = entity.getId();
        this.userId = entity.getUserId();
        this.petPickId = entity.getPetPickId();
    }
}
