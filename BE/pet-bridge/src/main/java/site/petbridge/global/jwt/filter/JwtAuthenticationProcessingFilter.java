package site.petbridge.global.jwt.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.core.authority.mapping.NullAuthoritiesMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;
import site.petbridge.domain.user.User;
import site.petbridge.domain.user.repository.UserRepository;
import site.petbridge.global.jwt.service.JwtService;
import site.petbridge.global.jwt.util.PasswordUtil;

import java.io.IOException;
import java.util.Optional;

/**
 * Jwt 인증 필터
 * "/api/users/login" "이외"의 URI 요청이 왔을 때 처리하는 필터
 *
 * 기본적으로 사용자는 요청 헤더에 AccessToken만 담아서 요청
 * AccessToken 만료 시에만 RefreshToken을 요청 헤더에 AccessToken과 함께 요청
 *
 * 1. RefreshToken이 없고, AccessToken이 유효한 경우 -> 인증 성공 처리, RefreshToken을 재발급하지는 않는다.
 * 2. RefreshToken이 없고, AccessToken이 없거나 유효하지 않은 경우 -> 인증 실패 처리, 403 ERROR
 * 3. RefreshToken이 있는 경우 -> DB의 RefreshToken과 비교하여 일치하면 AccessToken 재발급, RefreshToken도 재발급(RTR 방식)
 *                              인증 성공 처리는 하지 않고 실패 처리
 *
 *  RTR(Refresh Token Rotation) 방식이란?
 *  Refresh Token을 한번만 사용할 수 있게 만드는 방법.
 *  Refresh Token 사용해서 Access Token 재발급 받을 때, Refresh Token도 재발급해버리는 방식
 *  Refresh Token을 한번 탈취당하면 Access Token을 계속 생성할 수 있기 때문에, RTR 방식 적용
 */

/**
 * 방식 : OncePerRequestFilter를 상속받아 "모든 요청"마다 한 번씩 실행되는 필터를 정의.
 */
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationProcessingFilter extends OncePerRequestFilter {

    // "/api/users/login"으로 들어오는 요청은 Filter 작동 X
    private static final String NO_CHECK_URL = "/api/users/login";

    private final JwtService jwtService;
    private final UserRepository userRepository;

    private GrantedAuthoritiesMapper authoritiesMapper = new NullAuthoritiesMapper();

    // doFilterInternal: "모든 요청"마다 JwtAuthenticationProcessinfFilter가 doFilterInternal 필터링 작업을 수행.
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        System.out.println("jwt filter 들어옴");
        System.out.println("accessToken은 "+jwtService.extractAccessToken(request));
        if (request.getRequestURI().equals(NO_CHECK_URL)) {
            // "/api/users/login" 요청에 대해선, 다음 filter 호출해서 return으로 넘어가게 함
            filterChain.doFilter(request, response);
            return;
        }
        
        // 사용자 요청 헤더에서 RefreshToken 추출
        // RefreshToken이 없거나 유효하지 않다면(DB 저장된 RefreshToken과 다르다면) null을 반환
        // 근데 사용자의 요청 헤더에 RefreshToken이 있는 경우는, AccessToken이 만료되어서 사용자가 AccessToken을 요청한 경우 밖에 없음.
        // 따라서 그 경우를 제외하면 추출한 refreshToken은 모두 null일 수 밖에
        String refreshToken = jwtService.extractRefreshToken(request)
                .filter(jwtService::isTokenValid)
                .orElse(null);

        // Refresh Token이 요청 헤더에 존재했다면, 사용자가 AccessToken 만료되어서 보낸 것이므로,
        // Refresh Token이 DB의 RefreshToken과 일치하는지 판단 후, 일치한다면 RefreshToken, AccessToken을 "재발급"해준다.
        if (refreshToken != null) {
            checkRefreshTokenAndReIssueAccessToken(response, refreshToken);
            // RefreshToken을 보낸 경우이므로, AccessToken 재발급 후 인증 처리는 하지 않기 위해 return해서 필터 진행 막기
            return;
        }
        
        // RefreshToken이 없거나 유효하지 않다면, AccessToken을 검사하고 인증을 처리하는 로직 수행
        // AccessToken이 없거나 유효하지 않다면, "인증 객체가 담기지 않은 상태로 다음 필터"로 넘어가기 때문에 403 에러 발생
        // AccessToken이 유효하다면, "인증 객체가 담긴 상태로 다음 필터"로 넘어가기 때문에 인증 성공
        if (refreshToken == null) {
            System.out.println("refresh토큰은 없고 access를 검사해보자.");
            checkAccessTokenAndAuthentication(request, response, filterChain);
        }
    }

    /**
     * [checkRefreshTokenAndReIssueAccessToken 메소드]     *
     * RefreshToken으로 유저 정보 찾고, AccessToken/ RefreshToken 재발급 메소드
     *
     * 파라미터로 들어온 RefreshToken으로 DB에서 유저를 찾고,
     * 해당 유저가 있다면 JwtService.createAccessToken()으로 AccessToken을 생성.
     * reIssueRefreshToken()으로 RefreshToken 재발급 & DB에 RefreshToken 업데이트
     * 그 후 JwtService.sendAccessAndRefreshToken으로 둘다 보내줌.
     */
    public void checkRefreshTokenAndReIssueAccessToken(HttpServletResponse response, String refreshToken) {
        userRepository.findByRefreshToken(refreshToken)
                .ifPresent(user -> {
                    String reIssuedRefreshToken = reIssueRefreshToken(user);
                    jwtService.sendAccessAndRefreshToken(response,
                            jwtService.createAccessToken(user.getEmail()),
                            reIssuedRefreshToken);
                });
    }

    /**
     * [reIssueRefreshToken 메소드]
     * RefreshToken 재발급 & DB에 RefreshToken 업데이트 메소드
     *
     * jwtService.createRefreshToken()으로 RefreshToken 재발급 후
     * DB에 재발급한 RefreshToken 업데이트 후 Flush
     */
    private String reIssueRefreshToken(User user) {
        String reIssuedRefreshToken = jwtService.createRefreshToken();
        user.updateRefreshToken(reIssuedRefreshToken);
        userRepository.saveAndFlush(user);
        return reIssuedRefreshToken;
    }

    /**
     * [checkAccessTokenAndAuthentication 메소드]
     * AccessToken 체크 & 인증 처리 메소드
     *
     * request에서 extractAccessToken()으로 AccessToken 추출 후, isTokenValid()로 유효 토큰 검증
     * 유효 토큰이면, AccessToken에서 extractEmail로 Email 추출 후, findByEmail()로 해당 이메일을 사용하는 유저 객체 반환
     * 그 유저 객체를 saveAuthentication()으로 인증 처리하여, 인증 허가 처리된 유저 객체를 "SecurityContextHoder"에 담기
     * 그 후 다음 인증 필터로 진행
     */
    public void checkAccessTokenAndAuthentication(HttpServletRequest request, HttpServletResponse response,
                                                  FilterChain filterChain) throws ServletException, IOException {
        log.info("checkAccessTokenAndAuthentication() 호출");
//        boolean tokenValid = jwtService.extractAccessToken(request)
//                .filter(jwtService::isTokenValid)
//                .map(accessToken -> {
//                    jwtService.extractEmail(accessToken)
//                            .ifPresent(email -> userRepository.findByEmail(email)
//                                    .ifPresent(this::saveAuthentication));
//                    return true;
//                })
//                .orElse(false);
//
//        if (!tokenValid) {
//            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Access Token is expired or invalid");
//            System.out.println("not valid token");
//            return;
//        }

        jwtService.extractAccessToken(request)
                        .filter(jwtService::isTokenValid)
                                .ifPresent(accessToken -> jwtService.extractEmail(accessToken)
                                                .ifPresent(email -> userRepository.findByEmail(email)
                                                                .ifPresent(this::saveAuthentication)));


        System.out.println("filterChain 전까지 옴");

        filterChain.doFilter(request, response);
    }


    /**
     * [saveAuthentication 메소드]
     * 인증 허가 메소드
     * 파라미터의 user : 우리가 만든 회원 객체 / 빌더의 user : UserDetails의 User 객체
     *
     * new UsernamePasswordAuthenticationToken()로 "인증 객체인 Authentication 객체" 생성
     * UsernamePasswordAuthenticationToken의 파라미터
     * 1. 위에서 만든 UserDetailUser 객체 (유저 정보)
     * 2. credential(보통 비밀번호로, 인증 시에는 보통 null로 제거)
     * 3. Collection < ? extends GrantedAuthority>
     * 로 UserDetails의 User 객체 안에 Set<GrantedAuthority> authorities가 있어서 getter로 호출한 후에,
     * new NullAuthoritiesMapper()로 GrantedAuthoritiesMapper 객체를 생성하고 mapAuthorities()에 담기
     * 
     * SecurityContextHolder.getContext()로 SecurityContext를 꺼낸 후,
     * setAuthentication()을 이용해서 위에서 만든 Authentication 객체에 대한 인증 허가 처리
     */
    public void saveAuthentication(User myUser) {
        String password = myUser.getPassword();
        // 소셜 로그인 유저(password == null)의 비밀번호 임의로 만들어서, 소셜 로그인 유저도 인증되도록 설정
        if (password == null) {
            password = PasswordUtil.generateRandomPassword();
        }

        UserDetails userDetailsUser = org.springframework.security.core.userdetails.User.builder()
                .username(myUser.getEmail())
                .password(password)
                .roles(myUser.getRole().name())
                .build();

        Authentication authentication =
                new UsernamePasswordAuthenticationToken(userDetailsUser, null,
                        authoritiesMapper.mapAuthorities(userDetailsUser.getAuthorities()));

        // SecurityContextHolder.getContext() 즉 SecurityContext에 Authentication 객체 저장
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

}
