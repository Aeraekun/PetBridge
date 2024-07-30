package site.petbridge.domain.animal.domain.enums;

import lombok.Getter;

@Getter
public enum Status {
	PROTECTING("보호중"),
	WAITING("입양대기"),
	ADOPTED("입양완료"),
	DECEASED("사망");

	private final String name;

	private Status(String name) {
		this.name = name;
	}

	public String getName() {
		return this.name;
	}

	public static Status nameOf(String name) {
		for (Status status : Status.values()) {
			if (status.getName().equals(name)) {
				return status;
			}
		}
        throw new IllegalArgumentException("Unknown status: " + name);
	}
}