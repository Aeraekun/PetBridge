package site.petbridge.global.payment.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import site.petbridge.domain.user.domain.User;
import site.petbridge.domain.user.repository.UserRepository;
import site.petbridge.global.payment.dto.response.ApproveResponseDto;
import site.petbridge.global.payment.dto.response.ReadyResponseDto;
import site.petbridge.util.AuthUtil;

@Service
@Transactional
@RequiredArgsConstructor
public class KakaoPayServiceImpl implements KakaoPayService {

	@Value("${pay.secret-key}")
	private String SECRET_KEY;

	private final AuthUtil authUtil;
	private final UserRepository userRepository;

	// 카카오페이 결제창 연결
	public ReadyResponseDto payReady(String name, int totalPrice) {
		User user = authUtil.getAuthenticatedUser();

		Map<String, String> parameters = new HashMap<>();
		parameters.put("cid", "TC0ONETIME");                                    // 가맹점 코드(테스트용)
		parameters.put("partner_order_id", "1234567890");                       // 주문번호
		parameters.put("partner_user_id", "roommake");                          // 회원 아이디
		parameters.put("item_name", "견우와직묘 책임비(" + name + " 입양)");        // 상품명
		parameters.put("quantity", "1");                                        // 상품 수량
		parameters.put("total_amount", String.valueOf(totalPrice));             // 상품 총액
		parameters.put("tax_free_amount", "0");                                 // 상품 비과세 금액
		parameters.put("approval_url", "http://localhost:8080/api/payment/completed?user_id=" + user.getId()); // 결제 성공 시 URL
		parameters.put("cancel_url", "http://localhost:8080/api/payment/cancel");      // 결제 취소 시 URL
		parameters.put("fail_url", "http://localhost:8080/api/payment/fail");          // 결제 실패 시 URL

		// HttpEntity : HTTP 요청 또는 응답에 해당하는 Http Header와 Http Body를 포함하는 클래스
		HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());

		// RestTemplate
		// : Rest 방식 API를 호출할 수 있는 Spring 내장 클래스
		//   REST API 호출 이후 응답을 받을 때까지 기다리는 동기 방식 (json, xml 응답)
		RestTemplate template = new RestTemplate();
		String url = "https://open-api.kakaopay.com/online/v1/payment/ready";
		ResponseEntity<ReadyResponseDto> responseEntity = template.postForEntity(url, requestEntity, ReadyResponseDto.class);
		System.out.println(responseEntity.getBody());

		return responseEntity.getBody();
	}

	// 카카오페이 결제 승인
	// 사용자가 결제 수단을 선택하고 비밀번호를 입력해 결제 인증을 완료한 뒤,
	// 최종적으로 결제 완료 처리를 하는 단계
	public ApproveResponseDto payApprove(String tid, String pgToken) {
		Map<String, String> parameters = new HashMap<>();
		parameters.put("cid", "TC0ONETIME");              // 가맹점 코드(테스트용)
		parameters.put("tid", tid);                       // 결제 고유번호
		parameters.put("partner_order_id", "1234567890"); // 주문번호
		parameters.put("partner_user_id", "roommake");    // 회원 아이디
		parameters.put("pg_token", pgToken);              // 결제승인 요청을 인증하는 토큰

		HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());

		RestTemplate template = new RestTemplate();
		String url = "https://open-api.kakaopay.com/online/v1/payment/approve";
		return template.postForObject(url, requestEntity, ApproveResponseDto.class);
	}

	// 카카오페이 측에 요청 시 헤더부에 필요한 값
	public HttpHeaders getHeaders() {
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", "SECRET_KEY " + SECRET_KEY);
		headers.set("Content-type", "application/json");

		return headers;
	}
}
