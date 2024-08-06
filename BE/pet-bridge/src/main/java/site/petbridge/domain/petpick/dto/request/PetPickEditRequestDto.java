package site.petbridge.domain.petpick.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.petbridge.domain.petpick.domain.PetPick;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PetPickEditRequestDto {

    private Integer boardId;

    @NotNull
    private int animalId;

    @NotNull
    private String title;

    @NotNull
    private String content;

    public PetPick toEntity(String thumbnailFile) {
        return PetPick.builder()
                .boardId(boardId)
                .animalId(animalId)
                .title(title)
                .thumbnail(thumbnailFile)
                .content(content)
                .build();
    }
}
