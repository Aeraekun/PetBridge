package site.petbridge.domain.petpick.dto.response;

import lombok.Getter;
import site.petbridge.domain.petpick.domain.PetPick;

import java.time.LocalDateTime;

@Getter
public class PetPickResponseDto {

    private int id;
    private int userId;
    private int boardId;
    private int animalId;
    private String title;
    private String content;
    private String thumbnail;
    private String video;
    private LocalDateTime registTime;
    private boolean disabled;

    public PetPickResponseDto(PetPick entity) {
        this.id = entity.getId();
        this.userId = entity.getUserId();
        this.boardId = entity.getBoardId();
        this.animalId = entity.getAnimalId();
        this.title = entity.getTitle();
        this.content = entity.getContent();
        this.thumbnail = entity.getThumbnail();
        this.video = entity.getVideo();
        this.registTime = entity.getRegistTime();
        this.disabled = entity.isDisabled();
    }
}
