package site.petbridge.domain.user.domain;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import site.petbridge.domain.user.domain.enums.Role;
import site.petbridge.domain.user.domain.enums.SocialType;
import site.petbridge.domain.user.dto.request.UserEditRequestDto;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@ToString
@Table(name = "users")
@NoArgsConstructor(access =  AccessLevel.PROTECTED)
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    private String email;

    private String password;

    private String nickname;

    private LocalDate birth;

    private String phone;

    private String image;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Enumerated(EnumType.STRING)
    @Column(name = "social_type")
    private SocialType socialType; // KAKAO, NAVER, GOOGLE

    @Column(name = "social_id")
    private String socialId; // 로그인한 소셜 타입의 식별자 값 (일반 로그인의 경우 null)

    @Column(name = "refresh_token")
    private String refreshToken;

    private boolean disabled = false;

    @Builder
    public User(String email, String password, String nickname, LocalDate birth, String phone, String image,
                Role role, SocialType socialType, String socialId) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.birth = birth;
        this.phone = phone;
        this.image = image;
        this.role = role;
        this.socialType = socialType;
        this.socialId = socialId;
    }

    // 유저 권한 설정 메소드
    public void authorizeSocialUser() { this.role = Role.USER; }

   // 비밀번호 암호화 메소드
    public void passwordEncode(PasswordEncoder passwordEncoder) {
        this.password = passwordEncoder.encode(this.password);
    }

    // 회원 탈퇴
    public void disable() {
        this.disabled = true;
    }

    public void updatePassword(String updatePassword, PasswordEncoder passwordEncoder) {
        this.password = passwordEncoder.encode(updatePassword);
    }

    public void updateRefreshToken(String updateRefreshToken) {
        this.refreshToken = updateRefreshToken;
    }
}
