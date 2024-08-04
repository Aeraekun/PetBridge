package site.petbridge.domain.petpickcomment.dto.response;

import lombok.Getter;
import lombok.Setter;
import site.petbridge.domain.petpickcomment.domain.PetPickComment;

import java.time.LocalDateTime;

@Getter
@Setter
public class PetPickCommentResponseDto {
    private int id;
    private int userId;
    private int petPickId;
    private String content;
    private LocalDateTime registTime = LocalDateTime.now();
    private String userNickname;
    private String userImage;


    public PetPickCommentResponseDto(PetPickComment entity, String userNickname, String image) {
        this.id = entity.getId();
        this.userId = entity.getUserId();
        this.petPickId = entity.getPetPickId();
        this.content = entity.getContent();
        this.registTime = entity.getRegistTime();
        this.userNickname = userNickname;
        this.userImage = image;
    }
}
