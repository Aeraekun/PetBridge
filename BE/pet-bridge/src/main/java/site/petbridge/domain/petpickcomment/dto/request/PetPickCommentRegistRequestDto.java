package site.petbridge.domain.petpickcomment.dto.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.petbridge.domain.petpick.domain.PetPick;
import site.petbridge.domain.petpickcomment.domain.PetPickComment;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PetPickCommentRegistRequestDto {

    private int petPickId;
    private String content;

    public PetPickComment toEntity(int userId) {
        return PetPickComment.builder()
                .petPickId(petPickId)
                .userId(userId)
                .content(content)
                .build();
    }
}
