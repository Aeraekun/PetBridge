package site.petbridge.domain.petpickcomment.dto.request;

import site.petbridge.domain.petpickcomment.domain.PetPickComment;

public class PetPickCommentEditRequestDto {

    private String content;

    public PetPickComment toEntity() {
        return PetPickComment.builder()
                .content(content)
                .build();
    }
}
