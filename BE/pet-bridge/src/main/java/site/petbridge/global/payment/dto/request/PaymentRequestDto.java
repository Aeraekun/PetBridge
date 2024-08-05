package site.petbridge.global.payment.dto.request;

import lombok.Getter;
import site.petbridge.domain.petpickcomment.domain.PetPickComment;

@Getter
public class PaymentRequestDto {

	private String name;
	private int totalPrice;

}