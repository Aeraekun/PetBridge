package site.petbridge.domain.follow.dto.response;

import lombok.Getter;
import site.petbridge.domain.follow.domain.Follow;
import site.petbridge.domain.petpicklike.domain.PetPickLike;

@Getter
public class FollowResponseDto {
    private int id;
    private int userId;
    private int animalId;

    public FollowResponseDto(Follow entity) {
        this.id = entity.getId();
        this.userId = entity.getUserId();
        this.animalId = entity.getAnimalId();
    }
}
