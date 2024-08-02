package site.petbridge.domain.petpicklike.dto.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.petbridge.domain.petpicklike.domain.PetPickLike;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PetPickLikeRequestDto {

    private int petPickId;

    public PetPickLike toEntity(int userId) {
        return PetPickLike.builder()
                .userId(userId)
                .petPickId(petPickId)
                .build();
    }
}
