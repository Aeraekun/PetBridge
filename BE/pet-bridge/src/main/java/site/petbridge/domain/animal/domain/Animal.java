package site.petbridge.domain.animal.domain;

import java.sql.Timestamp;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Builder
@Table(name = "animals")
@AllArgsConstructor
public class Animal {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(name = "user_id")
	private int userId;

	private String name;

	private String filename;

	@Column(name = "happen_dt", nullable = false)
	private Timestamp happenDt;

	@Column(name = "kind_cd")
	private String kindCd;

	@Column(name = "color_cd")
	private String colorCd;
	private String age;
	private String weight;

	@Column(name = "notice_no", length = 100, nullable = true)
	private String noticeNo;

	private String popfile;

	@Column(name = "process_state")
	private String processState;

	@Column(name = "sex_cd")
	private String sexCd;

	@Column(name = "neuter_yn")
	private String neuterYn;

	@Column(name = "special_mark")
	private String specialMark;

	@Column(name = "care_addr")
	private String careAddr;

	@Column(name = "notice_comment")
	private String noticeComment;

	@Builder.Default
	private boolean disabled = false;
}
