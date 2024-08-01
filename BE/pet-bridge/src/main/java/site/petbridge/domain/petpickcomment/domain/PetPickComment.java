package site.petbridge.domain.petpickcomment.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access =  AccessLevel.PROTECTED)
@Entity
@Table(name = "short_comments")
public class PetPickComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "short_id")
    private int petPickId;

    private String content;

    @Column(name = "regist_time")
    private LocalDateTime registTime = LocalDateTime.now();

    private boolean disabled = false;

    @Builder
    public PetPickComment(int userId, int petPickId, String content) {
        this.userId = userId;
        this.petPickId = petPickId;
        this.content = content;
    }
}
