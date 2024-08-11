package site.petbridge.domain.board.domain;

import jakarta.persistence.*;
import lombok.*;
import site.petbridge.domain.board.domain.enums.BoardType;
import site.petbridge.domain.board.dto.request.BoardEditRequestDto;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "boards")
@NoArgsConstructor(access =  AccessLevel.PROTECTED)
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "animal_id")
    private Integer animalId;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private BoardType boardType;

    private String thumbnail;

    private String title;

    private String content;

    @Column(name = "regist_time")
    private LocalDateTime registTime = LocalDateTime.now();

    private String lat;

    private String lon;

    private boolean disabled = false;

    @Builder
    public Board(int userId, Integer animalId, BoardType boardType, String thumbnail, String title,
                 String content, String lat, String lon) {
        this.userId = userId;
        this.animalId = animalId;
        this.boardType = boardType;
        this.thumbnail = thumbnail;
        this.title = title;
        this.content = content;
        this.lat = lat;
        this.lon = lon;
    }

    public void update(BoardEditRequestDto boardEditRequestDto) {
        this.animalId = boardEditRequestDto.getAnimalId();
        this.boardType = boardEditRequestDto.getType();
        this.title = boardEditRequestDto.getTitle();
        this.content = boardEditRequestDto.getContent();
        this.lat = boardEditRequestDto.getLat();
        this.lon = boardEditRequestDto.getLon();
    }

    public void disable() {
        this.disabled = true;
    }
}
