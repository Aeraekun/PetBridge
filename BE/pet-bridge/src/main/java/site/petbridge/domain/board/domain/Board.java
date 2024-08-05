package site.petbridge.domain.board.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.petbridge.domain.board.domain.enums.BoardType;
import site.petbridge.domain.board.dto.request.BoardEditRequestDto;

import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "boards")
@NoArgsConstructor(access =  AccessLevel.PROTECTED)
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "animal_id")
    private int animalId;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private BoardType boardType;

    private String thumbnail;

    private String title;

    private String content;

    @Column(name = "regist_time")
    private LocalDateTime registTime;

    private String lat;

    private String lon;

    private boolean disabled = false;

    @Builder
    public Board(int userId, int animalId, BoardType boardType, String thumbnail, String title, String content,
                 LocalDateTime registTime, String lat, String lon) {
        this.userId = userId;
        this.animalId = animalId;
        this.boardType = boardType;
        this.thumbnail = thumbnail;
        this.title = title;
        this.content = content;
        this.registTime = registTime;
        this.lat = lat;
        this.lon = lon;
    }

    public void update(BoardEditRequestDto boardEditRequestDto, String thumbnail) {
        this.animalId = boardEditRequestDto.getAnimalId();
        this.boardType = boardEditRequestDto.getBoardType();
        this.thumbnail = thumbnail;
        this.title = boardEditRequestDto.getTitle();
        this.content = boardEditRequestDto.getContent();
        this.lat = boardEditRequestDto.getLat();
        this.lon = boardEditRequestDto.getLon();
    }

    public void disable() {
        this.disabled = true;
    }
}
