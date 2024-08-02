package site.petbridge.domain.petpick.dto.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;
import site.petbridge.domain.petpick.domain.PetPick;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PetPickRegistRequestDto {

    private int boardId;
    private int animalId;
    private String title;
    private String content;

    public PetPick toEntity(int userId, String thumbnailFile, String videoFile) {
        return PetPick.builder()
                .userId(userId)
                .boardId(boardId)
                .animalId(animalId)
                .title(title)
                .content(content)
                .thumbnail(thumbnailFile)
                .video(videoFile)
                .build();
    }
}
