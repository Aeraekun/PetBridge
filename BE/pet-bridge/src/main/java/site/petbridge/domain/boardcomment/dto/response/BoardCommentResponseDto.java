package site.petbridge.domain.boardcomment.dto.response;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import site.petbridge.domain.boardcomment.domain.BoardComment;
import site.petbridge.domain.user.domain.User;

@Data
@Builder
@AllArgsConstructor
public class BoardCommentResponseDto {

    private int id;
    private int boardId;
    private int userId;
    private String content;
    private Timestamp registTime;
    private boolean disabled;

    private String userNickname;
    private String userImage;

    public static BoardCommentResponseDto TransferToBoardCommentResponseDto(BoardComment boardComment, User user){
        return BoardCommentResponseDto.builder()
            .id(boardComment.getId())
            .boardId(boardComment.getId())
            .userId(boardComment.getUserId())
            .content(boardComment.getContent())
            .registTime(boardComment.getRegistTime())
            .disabled(boardComment.isDisabled())
            .userNickname(user.getNickname())
            .userImage(user.getImage())
            .build();
    }

}
