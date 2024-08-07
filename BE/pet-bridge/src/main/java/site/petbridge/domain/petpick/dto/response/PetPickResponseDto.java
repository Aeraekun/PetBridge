package site.petbridge.domain.petpick.dto.response;

import lombok.Getter;
import site.petbridge.domain.petpick.domain.PetPick;
import site.petbridge.domain.petpickcomment.dto.response.PetPickCommentResponseDto;
import site.petbridge.domain.user.domain.User;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class PetPickResponseDto {

    private int id;
    private int userId;
    private Integer boardId;
    private int animalId;
    private String title;
    private String content;
    private String thumbnail;
    private String video;
    private LocalDateTime registTime;

    private String userNickname;
    private String userImage;

    private int likeCnt;

    Boolean isLiking;
    Boolean isFollowing;

    List<PetPickCommentResponseDto> comments;



    public PetPickResponseDto(PetPick entity, String userNickname, String userImage, int likeCnt, boolean isLiking, boolean isFollowing,
                              List<PetPickCommentResponseDto> comments) {
        this.id = entity.getId();
        this.userId = entity.getUserId();
        this.boardId = entity.getBoardId();
        this.animalId = entity.getAnimalId();
        this.title = entity.getTitle();
        this.content = entity.getContent();
        this.thumbnail = entity.getThumbnail();
        this.video = entity.getVideo();
        this.registTime = entity.getRegistTime();

        this.userNickname = userNickname;
        this.userImage = userImage;

        this.likeCnt = likeCnt;

        this.isLiking = isLiking;

        this.isFollowing = isFollowing;

        this.comments = comments;
    }
}
