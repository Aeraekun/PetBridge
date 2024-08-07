package site.petbridge.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.web.cors.CorsUtils;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import site.petbridge.domain.user.repository.UserRepository;
import site.petbridge.global.jwt.filter.JwtAuthenticationProcessingFilter;
import site.petbridge.global.jwt.service.JwtService;
import site.petbridge.global.login.filter.CustomJsonUsernamePasswordAuthenticationFilter;
import site.petbridge.global.login.handler.LoginFailureHandler;
import site.petbridge.global.login.handler.LoginSuccessHandler;
import site.petbridge.global.login.service.LoginService;
import site.petbridge.global.oauth2.handler.OAuth2LoginFailureHandler;
import site.petbridge.global.oauth2.handler.OAuth2LoginSuccessHandler;
import site.petbridge.global.oauth2.service.CustomOAuth2UserService;

/**
 * 인증은 CustomJsonUsernamePasswordAuthenticationFilter에서 authenticate()로 인증된 사용자로 처리
 * JwtAuthenticationProcessingFilter는 AccessToken, RefreshToken 재발급
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

	private final LoginService loginService;
	private final JwtService jwtService;
	private final UserRepository userRepository;
	private final ObjectMapper objectMapper;
	private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;
	private final OAuth2LoginFailureHandler oAuth2LoginFailureHandler;
	private final CustomOAuth2UserService customOAuth2UserService;

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
			.formLogin(AbstractHttpConfigurer::disable) // FormLogin 사용 X
			.httpBasic(AbstractHttpConfigurer::disable) // httpBasic 사용 X
			.csrf(AbstractHttpConfigurer::disable) // csrf 보안 사용 X
			.sessionManagement(
				sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
			.authorizeHttpRequests(authorize -> authorize
				.requestMatchers(CorsUtils::isPreFlightRequest).permitAll()

				// 기본 파일
				.requestMatchers(HttpMethod.GET, "/error", "/favicon.ico").permitAll()


				// 회원
				.requestMatchers(HttpMethod.GET, "/users/sign-up", "/users/login").permitAll()
				.requestMatchers(HttpMethod.GET, "/api/users/{nickname}").permitAll()
				.requestMatchers(HttpMethod.GET, "/api/users/list/{nickname}").permitAll()
				.requestMatchers(HttpMethod.POST, "/api/users/login").permitAll()
				.requestMatchers(HttpMethod.POST, "/api/users/sign-up").permitAll()
				.requestMatchers(HttpMethod.POST, "/api/users/find/email").permitAll()

				// 소셜 로그인
				.requestMatchers(HttpMethod.GET, "/users/social/**").permitAll()
				.requestMatchers(HttpMethod.GET, "/api/oauth2/authorization/**").permitAll()

				// 인증
				.requestMatchers(HttpMethod.POST,"/api/users/authentication/email").permitAll()
				.requestMatchers(HttpMethod.POST,"/api/users/authentication/email/check").permitAll()
				.requestMatchers(HttpMethod.POST,"/api/users/authentication/phone").permitAll()
				.requestMatchers(HttpMethod.POST,"/api/users/authentication/phone/check").permitAll()

				// 펫픽
				.requestMatchers(HttpMethod.GET, "/api/petpicks/**").permitAll()

				// 펫픽 댓글
				.requestMatchers(HttpMethod.GET,"/api/petpick-comments/**").permitAll()

				// 게시글
				.requestMatchers(HttpMethod.GET, "/api/boards/**").permitAll()

				// 게시글 댓글
				.requestMatchers(HttpMethod.GET, "/api/board-comments/**").permitAll()

				// 동물
				.requestMatchers(HttpMethod.GET, "/api/animals/**").permitAll()

				// 계약서
				.requestMatchers(HttpMethod.GET, "/api/contracts/user/{userId}").permitAll()
				.requestMatchers(HttpMethod.GET, "/api/contracts/{id}").permitAll()
				.requestMatchers(HttpMethod.POST, "/api/contracts").permitAll()
				.requestMatchers(HttpMethod.PATCH, "/api/contracts/{id}").permitAll()
				.requestMatchers(HttpMethod.DELETE, "/api/contracts/{id}/disable").permitAll()
				.requestMatchers(HttpMethod.PATCH, "/api/contract-checks/{id}").permitAll()

				// 채팅
				.requestMatchers(HttpMethod.GET,"/ws/**").permitAll()
				.requestMatchers(HttpMethod.GET,"/ws/chat/**").permitAll()
				.requestMatchers(HttpMethod.GET, "/api/chat/rooms/user/{userId}").permitAll()
				.requestMatchers(HttpMethod.GET, "/api/chat/rooms/{roomId}").permitAll()
				.requestMatchers(HttpMethod.POST, "/api/chat/rooms").permitAll()
				.requestMatchers(HttpMethod.POST, "/api/chat-messages/{roomId}").permitAll()
				.requestMatchers(HttpMethod.POST, "/api/chat-rooms/{userId}").permitAll()
				.requestMatchers(HttpMethod.POST, "/api/chat-rooms/{userId}").permitAll()
				.requestMatchers(HttpMethod.GET,"/friendChat").permitAll()
				.requestMatchers(HttpMethod.GET,"/friendChat/**").permitAll()
				.requestMatchers(HttpMethod.GET,"/chat/{id}").permitAll()
				.requestMatchers(HttpMethod.GET,"/chat/room/user/{userId}").permitAll()
				.requestMatchers(HttpMethod.POST,"/chat/room").permitAll()
				.requestMatchers(HttpMethod.GET,"/chat/room/{userId}").permitAll()
				.requestMatchers("/api/chat/messages").permitAll()


				// 결제
				.requestMatchers(HttpMethod.POST,"/api/payment/ready").permitAll()
				.requestMatchers(HttpMethod.GET,"/api/payment/completed").permitAll()
				.anyRequest().authenticated()
			)
			// 소셜 로그인
			.oauth2Login(oauth2 -> oauth2
				.userInfoEndpoint(userInfoEndpoint -> userInfoEndpoint.userService(customOAuth2UserService))
				.successHandler(oAuth2LoginSuccessHandler)
				.failureHandler(oAuth2LoginFailureHandler)
			)
			// 예외 처리
			.exceptionHandling(exceptionHandling -> exceptionHandling
				.authenticationEntryPoint((request, response, authException) -> {
					response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
				})
			);

		// 원래 스프링 시큐리티 필터 순서가 LogoutFilter 이후에 로그인 필터 동작
		// 따라서, LogoutFilter 이후에 우리가 만든 필터 동작하도록 설정
		// 순서 : LogoutFilter -> JwtAuthenticationProcessingFilter -> CustomJsonUsernamePasswordAuthenticationFilter
		http.addFilterAfter(customJsonUsernamePasswordAuthenticationFilter(), LogoutFilter.class);
		http.addFilterBefore(jwtAuthenticationProcessingFilter(), CustomJsonUsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return PasswordEncoderFactories.createDelegatingPasswordEncoder();
	}

	/**
	 * AuthenticationManager 설정 후 등록
	 * PasswordEncoder를 사용하는 AuthenticationProvider를 지정 (PasswordEncoder는 위에서 등록한 PasswordEncoder 사용)
	 * FormLogin (기존 스프링 시큐리티 로그인)과 동일하게 DaoAuthenticationProvider 사용
	 * UserDetailsService는 커스텀 LoginService로 등록
	 * FormLogin과 동일하게 AuthenticationManager로는 구현체인 ProviderManager 사용 (return ProviderManager)
	 */
	@Bean
	public AuthenticationManager authenticationManager() {
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
		provider.setPasswordEncoder(passwordEncoder());
		provider.setUserDetailsService(loginService);
		return new ProviderManager(provider);
	}

	/**
	 * 로그인 성공 시 호출되는 LoginSuccessHandler 빈 등록
	 */
	@Bean
	public LoginSuccessHandler loginSuccessHandler() {
		return new LoginSuccessHandler(jwtService, userRepository);
	}

	/**
	 * 로그인 실패 시 호출되는 LoginFailureHandler 빈 등록
	 */
	@Bean
	public LoginFailureHandler loginFailureHandler() {
		return new LoginFailureHandler();
	}

	/**
	 * CustomJsonUsernamePasswordAuthenticationFilter 빈 등록
	 * 커스텀 필터를 사용하기 위해 만든 커스텀 필터를 Bean으로 등록함.
	 * setAuthenticationManager(authenticationManager())로 위에서 등록한 AuthenticationManager(ProviderManager) 설정
	 * 로그인 성공 시 호출할 handler, 실패 시 호출할 handler로 위에서 등록한 handler 설정
	 */
	@Bean
	public CustomJsonUsernamePasswordAuthenticationFilter customJsonUsernamePasswordAuthenticationFilter() {
		CustomJsonUsernamePasswordAuthenticationFilter customJsonUsernamePasswordAuthenticationFilter
			= new CustomJsonUsernamePasswordAuthenticationFilter(objectMapper);
		customJsonUsernamePasswordAuthenticationFilter.setAuthenticationManager(authenticationManager());
		customJsonUsernamePasswordAuthenticationFilter.setAuthenticationSuccessHandler(loginSuccessHandler());
		customJsonUsernamePasswordAuthenticationFilter.setAuthenticationFailureHandler(loginFailureHandler());

		return customJsonUsernamePasswordAuthenticationFilter;
	}

	@Bean
	public JwtAuthenticationProcessingFilter jwtAuthenticationProcessingFilter() {
		JwtAuthenticationProcessingFilter jwtAuthenticationProcessingFilter
			= new JwtAuthenticationProcessingFilter(jwtService, userRepository);

		return jwtAuthenticationProcessingFilter;
	}

}
