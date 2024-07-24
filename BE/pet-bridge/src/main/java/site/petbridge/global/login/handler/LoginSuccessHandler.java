package site.petbridge.global.login.handler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import site.petbridge.domain.user.repository.UserRepository;
import site.petbridge.global.jwt.service.JwtService;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final UserRepository userRepository;

    @Value("${jwt.access.expiration}")
    private String accessTokenExpiration;

    @Override
    public void onAuthenticationSuccess (HttpServletRequest request, HttpServletResponse response,
                                         Authentication authentication) throws IOException, ServletException {
        // 인증 정보에서 Username(email) 추출
        String email = extractUsername(authentication);
        // JwtService의 createAccessToken으로 AccessToken을 발급
        String accessToken = jwtService.createAccessToken(email);
        // JwtService의 createRefreshToken으로 RefreshToken을 발급
        String refreshToken = jwtService.createRefreshToken();

        // 응답 헤더에 AccessToken, RefreshToken 실어서 응답 보냄.
        jwtService.sendAccessAndRefreshToken(response, accessToken, refreshToken);

        userRepository.findByEmail(email)
                .ifPresent(user -> {
                    user.updateRefreshToken(refreshToken);
                    userRepository.saveAndFlush(user);
                });

        log.info("로그인에 성공했습니다. 이메일 : " + email);
        log.info("AccessToken : " + accessToken);
        log.info("발급된 AccessToken 만료 기간 : " + accessTokenExpiration);
    }

    private String extractUsername(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return userDetails.getUsername();
    }
}
