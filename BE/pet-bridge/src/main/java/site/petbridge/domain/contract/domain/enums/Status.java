package site.petbridge.domain.contract.domain.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Status {

	PRE_CONTRACT("계약전"),
	CONTRACT_COMPLETE("계약완료"),
	REFUND_PENDING("환급대기"),
	REFUND_COMPLETE("환급완료");

	private final String key;
}
