package site.petbridge.domain.user.service;

import java.time.Duration;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import site.petbridge.domain.user.domain.User;
import site.petbridge.domain.user.domain.enums.Role;
import site.petbridge.domain.user.dto.request.EmailRequestDto;
import site.petbridge.domain.user.dto.request.UserModifyRequestDto;
import site.petbridge.domain.user.dto.request.UserSignUpRequestDto;
import site.petbridge.domain.user.dto.response.UserResponseDto;
import site.petbridge.domain.user.repository.UserRepository;
import site.petbridge.global.jwt.service.JwtService;
import site.petbridge.global.redis.service.RedisService;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;

	private final JavaMailSender javaMailSender;
	private final RedisService redisService;

	@Value("${spring.mail.username}")
	private String senderEmail;

	@Value("${spring.auth-code-expiration-millis}")
	private int authCodeExpirationMillis;

	@Override
	public Optional<UserResponseDto> registUser(UserSignUpRequestDto userSignUpRequestDto) throws Exception {

		if (userRepository.findByEmail(userSignUpRequestDto.email()).isPresent()) {
			throw new Exception("이미 존재하는 이메일입니다.");
		}

		if (userRepository.findByNickname(userSignUpRequestDto.nickname()).isPresent()) {
			throw new Exception("이미 존재하는 닉네임입니다.");
		}

		User user = User.builder()
			.email(userSignUpRequestDto.email())
			.password(userSignUpRequestDto.password())
			.nickname(userSignUpRequestDto.nickname())
			.birth(userSignUpRequestDto.birth())
			.phone(userSignUpRequestDto.phone())
			.role(Role.USER)
			.build();

		user.passwordEncode(passwordEncoder);
		return Optional.ofNullable(userRepository.save(user).transferToUserResponseDto());
	}

	@Override
	public Optional<UserResponseDto> getDetailMyUser(HttpServletRequest httpServletRequest) throws Exception {
		String accessToken = jwtService.extractAccessToken(httpServletRequest).orElse(null);
		String email = jwtService.extractEmail(accessToken).orElse(null);

		return Optional.ofNullable(userRepository.findByEmail(email).orElseThrow().transferToUserResponseDto());
	}

	@Override
	public Optional<UserResponseDto> editUser(HttpServletRequest httpServletRequest,
		UserModifyRequestDto userModifyRequestDto) throws Exception {
		String accessToken = jwtService.extractAccessToken(httpServletRequest).orElse(null);
		String email = jwtService.extractEmail(accessToken).orElse(null);
		if (email == null) {
			throw new Exception("Invalid token");
		}

		Optional<User> optionalUser = userRepository.findByEmail(email);
		if (optionalUser.isPresent()) {
			User user = optionalUser.get();
			if (user.getSocialType() == null) {
				user.updateUserInfo(userModifyRequestDto);
				user.passwordEncode(passwordEncoder);
			} else {
				user.updateSocialUserInfo(userModifyRequestDto);
			}
			return Optional.ofNullable(user.transferToUserResponseDto());
		} else {
			throw new Exception("user not found");
		}
	}

	@Override
	public Optional<UserResponseDto> removeUser(HttpServletRequest httpServletRequest) throws Exception {
		String accessToken = jwtService.extractAccessToken(httpServletRequest).orElse(null);
		String email = jwtService.extractEmail(accessToken).orElse(null);
		if (email == null) {
			throw new Exception("Invalid token");
		}

		Optional<User> optionalUser = userRepository.findByEmail(email);
		if (optionalUser.isPresent()) {
			User user = optionalUser.get();
			user.disableUser();
			return Optional.ofNullable(user.transferToUserResponseDto());
		} else {
			throw new Exception("user not found");
		}
	}

	@Override
	public Optional<UserResponseDto> getDetailUserByEmail(String email) throws Exception {
		return Optional.ofNullable(userRepository.findByEmail(email).orElseThrow().transferToUserResponseDto());
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

}
