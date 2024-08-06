package site.petbridge.domain.board.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.petbridge.domain.board.domain.Board;
import site.petbridge.domain.board.domain.enums.BoardType;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BoardRegistRequestDto {

    private int animalId;

    @NotNull
    private BoardType type;

    @NotNull
    private String title;

    @NotNull
    private String content;

    private String lat;
    private String lon;

    public Board toEntity(int userId, String thumbnail) {
        return Board.builder()
                .userId(userId)
                .thumbnail(thumbnail)
                .animalId(animalId)
                .boardType(type)
                .title(title)
                .content(content)
                .lat(lat)
                .lon(lon)
                .build();
    }
}
