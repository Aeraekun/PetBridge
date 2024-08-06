package site.petbridge.domain.board.dto.response;

import com.querydsl.core.annotations.QueryProjection;
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

    private long commentCount;

    public BoardResponseDto(Board entity, User user, Animal animal, long commentCount) {
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

    @QueryProjection
    public BoardResponseDto(int id, int userId, int animalId, BoardType boardType, String thumbnail, String title,
                            String content, LocalDateTime registTime, String lat, String lon, boolean disabled,
                            String userNickname, String userImage, String animalName, String animalFilename, long commentCount) {
        this.id = id;
        this.userId = userId;
        this.animalId = animalId;
        this.boardType = boardType;
        this.thumbnail = thumbnail;
        this.title = title;
        this.content = content;
        this.registTime = registTime;
        this.lat = lat;
        this.lon = lon;
        this.disabled = disabled;
        this.userNickname = userNickname;
        this.userImage = userImage;
        this.animalName = animalName;
        this.animalFilename = animalFilename;
        this.commentCount = commentCount;
    }
}
