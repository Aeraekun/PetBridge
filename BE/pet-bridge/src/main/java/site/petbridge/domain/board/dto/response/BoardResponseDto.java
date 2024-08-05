package site.petbridge.domain.board.dto.response;

import jakarta.persistence.*;
import lombok.Getter;
import site.petbridge.domain.animal.domain.Animal;
import site.petbridge.domain.board.domain.Board;
import site.petbridge.domain.board.domain.enums.BoardType;
import site.petbridge.domain.user.domain.User;

import java.time.LocalDateTime;

@Getter
public class BoardResponseDto {
    private int id;
    private int userId;
    private int animalId;
    private BoardType boardType;
    private String thumbnail;
    private String title;
    private String content;
    private LocalDateTime registTime;
    private String lat;
    private String lon;
    private boolean disabled;

    private String userNickname;
    private String userImage;

    private String animalName;
    private String animalFilename;

    private int commentCount;

    public BoardResponseDto(Board entity, User user, Animal animal, int commentCount) {
        this.id = entity.getId();
        this.userId = entity.getUserId();
        this.animalId = animal.getId();
        this.boardType = entity.getBoardType();
        this.thumbnail = entity.getThumbnail();
        this.title = entity.getTitle();
        this.content = entity.getContent();
        this.registTime = entity.getRegistTime();
        this.lat = entity.getLat();
        this.lon = entity.getLon();
        this.disabled = entity.isDisabled();

        this.userNickname = user.getNickname();
        this.userImage = user.getImage();

        this.animalName = animal.getName();
        this.animalFilename = animal.getFilename();

        this.commentCount = commentCount;
    }
}
