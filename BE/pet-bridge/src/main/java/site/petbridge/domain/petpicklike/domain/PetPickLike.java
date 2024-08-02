package site.petbridge.domain.petpicklike.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access =  AccessLevel.PROTECTED)
@Table(name = "petpick_likes")
public class PetPickLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "petpick_id")
    private int petPickId;

    @Builder
    public PetPickLike(int userId, int petPickId) {
        this.userId = userId;
        this.petPickId = petPickId;
    }
}
