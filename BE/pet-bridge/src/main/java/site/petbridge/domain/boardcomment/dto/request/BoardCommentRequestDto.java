package site.petbridge.domain.boardcomment.dto.request;

import lombok.Data;

@Data
public class BoardCommentRequestDto {

    private int boardId;
    private int userId;
    private String content;

}
