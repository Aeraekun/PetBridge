package site.petbridge.domain.board.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.petbridge.domain.board.domain.Board;
import site.petbridge.domain.board.domain.enums.BoardType;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BoardEditRequestDto {

    @NotNull
    private int animalId;
    @NotNull
    private BoardType boardType;
    @NotNull
    private String title;
    @NotNull
    private String content;
    @NotNull
    private String lat;
    @NotNull
    private String lon;

    public Board toEntity(String thumbnail) {
        return Board.builder()
                .thumbnail(thumbnail)
                .animalId(animalId)
                .boardType(boardType)
                .title(title)
                .content(content)
                .lat(lat)
                .lon(lon)
                .build();
    }
}
