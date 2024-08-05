package site.petbridge.domain.boardcomment.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.petbridge.domain.board.domain.Board;
import site.petbridge.domain.board.domain.enums.BoardType;
import site.petbridge.domain.boardcomment.domain.BoardComment;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BoardCommentEditRequestDto {

    @NotNull
    private String content;

    public BoardComment toEntity() {
        return BoardComment.builder()
                .content(content)
                .build();
    }
}