package site.petbridge.domain.petpickcomment.dto.request;

import lombok.Getter;
import site.petbridge.domain.petpickcomment.domain.PetPickComment;

@Getter
public class PetPickCommentEditRequestDto {

    private String content;

    public PetPickComment toEntity() {
        return PetPickComment.builder()
                .content(content)
                .build();
    }
}
