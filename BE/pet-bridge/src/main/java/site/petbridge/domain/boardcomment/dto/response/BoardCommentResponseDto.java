package site.petbridge.domain.boardcomment.dto.response;

import lombok.Getter;
import site.petbridge.domain.boardcomment.domain.BoardComment;
import java.time.LocalDateTime;

@Getter
public class BoardCommentResponseDto {
    private int id;
    private int userId;
    private int boardId;
    private String content;
    private LocalDateTime registTime;
    private String userNickname;
    private String userImage;


    public BoardCommentResponseDto(BoardComment entity, String userNickname, String image) {
        this.id = entity.getId();
        this.userId = entity.getUserId();
        this.boardId = entity.getBoardId();
        this.content = entity.getContent();
        this.registTime = entity.getRegistTime();
        this.userNickname = userNickname;
        this.userImage = image;
    }
}