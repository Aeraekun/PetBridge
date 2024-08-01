package site.petbridge.domain.petpick.dto.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.petbridge.domain.petpick.domain.PetPick;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PetPickEditRequestDto {

    private int boardId;
    private int animalId;
    private String title;
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
