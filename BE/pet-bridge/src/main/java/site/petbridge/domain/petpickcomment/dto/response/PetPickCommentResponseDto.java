package site.petbridge.domain.petpickcomment.dto.response;

import lombok.Getter;
import site.petbridge.domain.petpickcomment.domain.PetPickComment;

import java.time.LocalDateTime;

@Getter
public class PetPickCommentResponseDto {
    private int id;
    private int userId;
    private int petPickId;
    private String content;
    private LocalDateTime registTime = LocalDateTime.now();
    private String nickname;
    private String image;

    public PetPickCommentResponseDto(PetPickComment entity, String nickname, String image) {
        this.id = entity.getId();
        this.userId = entity.getUserId();
        this.petPickId = entity.getPetPickId();
        this.content = entity.getContent();
        this.registTime = entity.getRegistTime();
        this.nickname = nickname;
        this.image = image;
    }
}
