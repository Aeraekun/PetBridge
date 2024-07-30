package site.petbridge.domain.boardcomment.domain;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Builder
@Table(name = "board_comments")
@AllArgsConstructor
public class BoardComment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(name = "board_id")
	private int boardId;

	@Column(name = "user_id")
	private int userId;

	private String content;

	@Column(name = "regist_time", insertable = false, updatable = false)
	private Timestamp registTime;

	@Builder.Default
	private boolean disabled = false;
}
