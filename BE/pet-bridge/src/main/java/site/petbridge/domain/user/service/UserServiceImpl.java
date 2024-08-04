package site.petbridge.domain.user.service;

import java.time.Duration;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.service.DefaultMessageService;

import jakarta.annotation.PostConstruct;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import site.petbridge.domain.user.domain.User;
import site.petbridge.domain.user.domain.enums.Role;
import site.petbridge.domain.user.dto.request.EmailRequestDto;
import site.petbridge.domain.user.dto.request.PhoneRequestDto;
import site.petbridge.domain.user.dto.request.UserEditRequestDto;
import site.petbridge.domain.user.dto.request.UserSignUpRequestDto;
import site.petbridge.domain.user.dto.response.UserResponseDto;
import site.petbridge.domain.user.repository.UserRepository;
import site.petbridge.global.exception.ErrorCode;
import site.petbridge.global.exception.PetBridgeException;
import site.petbridge.global.jwt.service.JwtService;
import site.petbridge.global.login.userdetail.CustomUserDetail;
import site.petbridge.global.redis.service.RedisService;
import site.petbridge.util.AuthUtil;
import site.petbridge.util.FileUtil;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final FileUtil fileUtil;
	private final AuthUtil authUtil;

	private final JavaMailSender javaMailSender;
	private final RedisService redisService;

	@Value("${spring.mail.username}")
	private String senderEmail;

	@Value("${spring.auth-code-expiration-millis}")
	private int authCodeExpirationMillis;

	@Value("${coolsms.senderNumber}")
	private String senderNumber;

	@Value("${coolsms.apiKey}")
	private String apiKey;

	@Value("${coolsms.apiSecret}")
	private String apiSecret;

	DefaultMessageService messageService;

	@PostConstruct
	public void init() {
		this.messageService = NurigoApp.INSTANCE.initialize(apiKey, apiSecret, "https://api.coolsms.co.kr");
	}

	/**
	 * 회원가입
	 */
	@Transactional
	@Override
	public void registUser(UserSignUpRequestDto userSignUpRequestDto) throws Exception {

		// 이메일 중복 검사
		if (userRepository.findByEmail(userSignUpRequestDto.getEmail()).isPresent()) {
			throw new PetBridgeException(ErrorCode.CONFLICT);
		}

		// 닉네임 중복 검사
		if (userRepository.findByNickname(userSignUpRequestDto.getNickname()).isPresent()) {
			throw new PetBridgeException(ErrorCode.CONFLICT);
		}

		User user = userSignUpRequestDto.toEntity();
		user.passwordEncode(passwordEncoder);

		userRepository.save(user);
	}

	/**
	 * 회원 전체 조회
	 */
	@Override
	public List<UserResponseDto> getListUser(int page, int size) throws Exception {
		User entity = authUtil.getAuthenticatedUser(userRepository);

		// ADMIN 아닐 때
		if (entity.getRole() != Role.ADMIN) {
			throw new PetBridgeException(ErrorCode.FORBIDDEN);
		}

		Sort sort = Sort.by(Sort.Direction.DESC, "id");
		Pageable pageable = PageRequest.of(page, size, sort);
		Page<User> users = userRepository.findAll(pageable);

		return users.stream()
			.map(UserResponseDto::new)
			.collect(Collectors.toList());
	}

	/**
	 * 내 회원 정보 상세 조회
	 */
	@Override
	public UserResponseDto getDetailMyUser() throws Exception {
		User entity = authUtil.getAuthenticatedUser(userRepository);

		return new UserResponseDto(entity);
	}

	/**
	 * 닉네임 기반 회원 검색
	 */
	@Override
	public UserResponseDto getDetailUserByNickname(String nickname) throws Exception {
		User entity = userRepository.findByNicknameAndDisabledFalse(nickname)
			.orElseThrow(() -> new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND));

		return new UserResponseDto(entity);
	}

	/**
	 * 내 회원정보 수정
	 */
	@Transactional
	@Override
	public void editUser(UserEditRequestDto userEditRequestDto, MultipartFile imageFile) throws Exception {
		User entity = authUtil.getAuthenticatedUser(userRepository);

		// 닉네임 중복시 409 CONFLICT
		if (userRepository.findByNicknameAndDisabledFalse(userEditRequestDto.getNickname()).isPresent()) {
			throw new PetBridgeException(ErrorCode.CONFLICT);
		}

		String savedImageFileName = null;
		if (imageFile != null) {
			savedImageFileName = fileUtil.saveFile(imageFile, "users");
		}

		entity.update(userEditRequestDto, savedImageFileName);
		entity.passwordEncode(passwordEncoder);
		userRepository.save(entity);
	}

	/**
	 * 회원 탈퇴
	 */
	@Transactional
	@Override
	public void removeUser() throws Exception {
		User entity = authUtil.getAuthenticatedUser(userRepository);

		entity.disable();
		userRepository.save(entity);
	}

	/**
	 * 회원 삭제(관리자)
	 */
	@Transactional
	@Override
	public void removeUserAdmin(int id) throws Exception {
		User user = authUtil.getAuthenticatedUser(userRepository);

		// ADMIN 아닐 때 or 나 자신을 삭제하려할 때
		if (user.getRole() != Role.ADMIN || user.getId() == id) {
			throw new PetBridgeException(ErrorCode.FORBIDDEN);
		}

		// 삭제할 회원
		User entity = userRepository.findById(id)
			.orElseThrow(() -> new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND));

		userRepository.delete(entity);
	}

	@Override
	public Optional<UserResponseDto> getDetailUserByEmail(String email) throws Exception {
		User user = userRepository.findByEmail(email)
			.orElseThrow(() -> new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND));

		return Optional.ofNullable(new UserResponseDto(user));
	}

	@Override
	public boolean checkEmailDuplicate(EmailRequestDto emailRequestDto) throws Exception {
		return userRepository.findByEmail(emailRequestDto.email()).isPresent();
	}

	@Override
	public MimeMessage CreateMail(String email, int code) {

		MimeMessage message = javaMailSender.createMimeMessage();

		try {
			message.setFrom(senderEmail);
			message.setRecipients(MimeMessage.RecipientType.TO, email);
			message.setSubject("PetBridge 이메일 인증 코드");
			String body = "";
			body += "<h3>" + "요청하신 인증 번호입니다." + "</h3>";
			body += "<h3>" + "5분 이내에 인증을 완료 해 주세요." + "</h3>";
			body += "<h1>" + code + "</h1>";
			body += "<h3>" + "감사합니다." + "</h3>";
			message.setText(body, "UTF-8", "html");

		} catch (Exception e) {
			e.printStackTrace();
		}

		return message;
	}

	@Override
	public void sendEmailAuthenticationCode(EmailRequestDto emailRequestDto) throws Exception {
		int code = (int)(Math.random() * (90000)) + 100000;
		MimeMessage message = CreateMail(emailRequestDto.email(), code);
		javaMailSender.send(message);

		// 이메일 인증 요청 시 인증 번호 Redis에 저장 ( key = "AuthCode " + Email / value = AuthCode )
		redisService.setValues(emailRequestDto.email(),
			String.valueOf(code), Duration.ofMillis(authCodeExpirationMillis));
	}

	@Override
	public boolean checkEmailAuthenticationCode(EmailRequestDto emailRequestDto) throws Exception {
		String redisAuthCode = redisService.getValues(emailRequestDto.email());
		if (!(redisService.checkExistsValue(redisAuthCode) && redisAuthCode.equals(
			String.valueOf(emailRequestDto.code())))) {
			System.out.println("인증코드 불일치");
			return false;
		}
		System.out.println("인증코드 일치");
		redisService.deleteValues(redisAuthCode);
		return true;
	}

	@Override
	public void sendPhoneAuthenticationCode(PhoneRequestDto phoneRequestDto) throws Exception {
		String to = phoneRequestDto.phone();
		int code = (int)(Math.random() * (90000)) + 100000;
		String certificationNumber = String.valueOf(code);

		Message message = new Message();
		message.setFrom(senderNumber);
		message.setTo(to);
		message.setText("[PetBridge] 본인 확인 인증번호는 [" + code + "]입니다.");
		message.setText("5분 이내에 인증을 완료해주세요.");
		messageService.sendOne(new SingleMessageSendingRequest(message));

		// SMS 인증 요청 시 인증 번호 Redis에 저장 ( key = Email / value = AuthCode )
		redisService.setValues(phoneRequestDto.phone(),
			String.valueOf(code), Duration.ofMillis(authCodeExpirationMillis));
	}

	@Override
	public boolean checkPhoneAuthenticationCode(PhoneRequestDto phoneRequestDto) throws Exception {
		String redisAuthCode = redisService.getValues(phoneRequestDto.phone());
		if (!(redisService.checkExistsValue(redisAuthCode) && redisAuthCode.equals(
			String.valueOf(phoneRequestDto.code())))) {
			System.out.println("인증코드 불일치");
			return false;
		}
		System.out.println("인증코드 일치");
		redisService.deleteValues(redisAuthCode);
		return true;
	}

}
