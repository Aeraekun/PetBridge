package site.petbridge.global.payment.dto.request;

import lombok.Getter;

@Getter
public class PaymentRequestDto {
	private int contractId;
	private String name;
	private int totalPrice;

}