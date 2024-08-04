package site.petbridge.domain.follow.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access =  AccessLevel.PROTECTED)
@Table(name = "follows")
public class Follow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "animal_id")
    private int animalId;

    @Builder
    public Follow(int userId, int animalId) {
        this.userId = userId;
        this.animalId = animalId;
    }
}

