package site.petbridge.domain.petpickcomment.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access =  AccessLevel.PROTECTED)
@Entity
@Table(name = "petpick_comments")
public class PetPickComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "petpick_id")
    private int petPickId;

    @Column(name = "user_id")
    private int userId;

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

    public void update(String content) {
        this.content = content;
    }

    public void disable() {
        this.disabled = true;
    }
}
