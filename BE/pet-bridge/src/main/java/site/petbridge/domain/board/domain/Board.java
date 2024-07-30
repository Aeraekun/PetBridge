package site.petbridge.domain.board.domain;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import site.petbridge.domain.board.domain.enums.BoardType;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Builder
@Table(name = "boards")
@AllArgsConstructor
public class Board {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;

	@Column(name = "user_id")
	private int userId;

	@Column(name = "animal_id")
	private int animalId;

	@Enumerated(EnumType.STRING)
	@Column(name = "type")
	private BoardType type; // PROMOTION, REVIEW, FREE, NOTICE

	private String thumbnail;
	private String title;
	private String content;

	@Column(name = "regist_time", insertable = false, updatable = false)
	private Timestamp registTime;

	private String lat;
	private String lon;

	@Builder.Default
	private boolean disabled = false;

}
