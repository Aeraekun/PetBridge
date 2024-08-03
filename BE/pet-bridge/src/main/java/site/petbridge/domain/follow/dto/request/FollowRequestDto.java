package site.petbridge.domain.follow.dto.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.petbridge.domain.follow.domain.Follow;
import site.petbridge.domain.petpicklike.domain.PetPickLike;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FollowRequestDto {

    private int animalId;

    public Follow toEntity(int userId) {
        return Follow.builder()
                .userId(userId)
                .animalId(animalId)
                .build();
    }
}

