package site.petbridge.domain.petpick.domain;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;
import site.petbridge.domain.board.domain.Board;
import site.petbridge.domain.petpick.dto.request.PetPickEditRequestDto;
import site.petbridge.domain.user.domain.User;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor(access =  AccessLevel.PROTECTED)
@Entity
@Table(name = "petpicks")
public class PetPick {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "board_id")
    private Integer boardId;

    @Column(name = "animal_id")
    private int animalId;

    private String title;

    private String content;

    private String thumbnail;

    private String video;

    @Column(name = "regist_time")
    private LocalDateTime registTime = LocalDateTime.now();

    private boolean disabled = false;

    @Builder
    public PetPick(int userId, Integer boardId, int animalId, String title, String thumbnail, String content, String video) {
        this.userId = userId;
        this.boardId = boardId;
        this.animalId = animalId;
        this.title = title;
        this.content = content;
        this.thumbnail = thumbnail;
        this.video = video;
    }

    public void update(PetPickEditRequestDto petPickEditRequestDto) {
        this.boardId = petPickEditRequestDto.getBoardId();
        this.animalId = petPickEditRequestDto.getAnimalId();
        this.title = petPickEditRequestDto.getTitle();
        this.content = petPickEditRequestDto.getContent();
    }

    public void disable() {
        this.disabled = true;
    }
}