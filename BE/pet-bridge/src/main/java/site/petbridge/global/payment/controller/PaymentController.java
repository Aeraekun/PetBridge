package site.petbridge.global.payment.controller;

import java.time.Duration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.petbridge.domain.contract.dto.request.ContractEditRequestDto;
import site.petbridge.domain.contract.service.ContractService;
import site.petbridge.domain.user.domain.User;
import site.petbridge.domain.user.repository.UserRepository;
import site.petbridge.global.payment.dto.request.PaymentRequestDto;
import site.petbridge.global.payment.dto.response.ApproveResponseDto;
import site.petbridge.global.payment.dto.response.ReadyResponseDto;
import site.petbridge.global.payment.service.KakaoPayService;
import site.petbridge.global.redis.service.RedisService;
import site.petbridge.util.AuthUtil;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/payment")
@SessionAttributes("tid")
public class PaymentController {

	private final KakaoPayService kakaoPayService;
	private final RedisService redisService;
	private final ContractService contractService;
	private final AuthUtil authUtil;

	@Value("${spring.auth-code-expiration-millis}")
	private int authCodeExpirationMillis;

	@PostMapping("/ready")
	public @ResponseBody ReadyResponseDto payReady(@RequestBody PaymentRequestDto paymentRequestDto) {

		int contractId = paymentRequestDto.getContractId();
		String name = paymentRequestDto.getName();
		int totalPrice = paymentRequestDto.getTotalPrice();

		// 카카오 결제 준비하기
		ReadyResponseDto readyResponseDto = kakaoPayService.payReady(contractId, name, totalPrice);

		// 결제 요청 시 결제 고유번호 Redis에 저장 ( key = contractId / value = tid )
		redisService.setValues(String.valueOf(contractId),
			String.valueOf(readyResponseDto.getTid()), Duration.ofMillis(authCodeExpirationMillis));

		return readyResponseDto;
	}

	@GetMapping("/completed")
	public ResponseEntity<ApproveResponseDto> payCompleted(
		@RequestParam("contract_id") String contractId,
		@RequestParam("pg_token") String pgToken) throws Exception {
		String tid = redisService.getValues(contractId);

		// 카카오 결제 요청하기
		ApproveResponseDto approveResponseDto = kakaoPayService.payApprove(tid, pgToken);

		// 계약 완료 처리
		User user = authUtil.getAuthenticatedUser();
		if(contractService.editContract(Integer.parseInt(contractId), new ContractEditRequestDto(Integer.parseInt(contractId), user.getId(), "계약완료")) == 0){
			return new ResponseEntity<>(approveResponseDto, HttpStatus.BAD_REQUEST);
		}
		return ResponseEntity.status(HttpStatus.OK)
			.body(approveResponseDto);
	}

	@GetMapping("/cancel")
	public ResponseEntity<String> cancel() {
		return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED)
			.body("사용자가 결제를 취소하였습니다.");
	}

	@GetMapping("/fail")
	public ResponseEntity<String> fail() {
		return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED)
			.body("결제에 실패하였습니다.");
	}
}
