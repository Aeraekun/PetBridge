package site.petbridge.domain.boardcomment.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.petbridge.domain.boardcomment.domain.BoardComment;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BoardCommentRegistRequestDto {

    @NotNull
    private int boardId;
    @NotNull
    private String content;

    public BoardComment toEntity(int userId) {
        return BoardComment.builder()
                .boardId(boardId)
                .userId(userId)
                .content(content)
                .build();
    }
}
