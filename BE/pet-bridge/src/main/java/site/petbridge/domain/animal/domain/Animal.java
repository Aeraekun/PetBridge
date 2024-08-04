package site.petbridge.domain.animal.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "animals")
@NoArgsConstructor(access =  AccessLevel.PROTECTED)
public class Animal {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(name = "user_id")
	private int userId;

	private String name;

	private String filename;

	private String species;

	@Column(name = "kind_cd")
	private String kindCd;

	@Column(name = "color_cd")
	private String colorCd;

	private int age;

	private int weight;

	@Column(name = "sex_cd")
	private char sexCd;

	@Column(name = "neuter_yn")
	private char neuterYn;

	@Column(name = "special_mark")
	private String specialMark;

	@Column(name = "care_addr")
	private String careAddr;

	private boolean disabled = false;

	@Builder
	public Animal(int userId, String name, String filename, String species, String kindCd, String colorCd,
				  int age, int weight, char sexCd, char neuterYn, String specialMark, String careAddr) {
		this.userId = userId;
		this.name = name;
		this.filename = filename;
		this.species = species;
		this.kindCd = kindCd;
		this.colorCd = colorCd;
		this.age = age;
		this.weight = weight;
		this.sexCd = sexCd;
		this.neuterYn = neuterYn;
		this.specialMark = specialMark;
		this.careAddr = careAddr;
	}

	public void update(String name, String filename, String species, String kindCd, String colorCd,
					   int age, int weight, char sexCd, char neuterYn, String specialMark, String careAddr) {
		this.name = name;
		this.filename = filename;
		this.species = species;
		this.kindCd = kindCd;
		this.colorCd = colorCd;
		this.age = age;
		this.weight = weight;
		this.sexCd = sexCd;
		this.neuterYn = neuterYn;
		this.specialMark = specialMark;
		this.careAddr = careAddr;
	}

	public void disable() {
		this.disabled = true;
	}
}
