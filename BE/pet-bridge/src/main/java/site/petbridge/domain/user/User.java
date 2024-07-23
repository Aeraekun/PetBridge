package site.petbridge.domain.user;

import jakarta.persistence.*;
import lombok.*;
//import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Date;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Builder
@Table(name = "users")
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    private String email;
    private String password;
    private String nickname;
    private Date birth;
    private String phone;
    private String image;
    private boolean disabled = false;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Enumerated(EnumType.STRING)
    @Column(name = "social_type")
    private SocialType socialType; // KAKAO, NAVER, GOOGLE

    @Column(name = "social_id")
    private String socialId; // 로그인한 소셜 타입의 식별자 값 (일반 로그인의 경우 null)

    @Column(name = "refresh_token")
    private String refreshToken;

    // 유저 권한 설정 메소드
    public void authorizeUser() { this.role = Role.USER; }

//   // 비밀번호 암호화 메소드
//    public void passwordEncode(PasswordEncoder passwordEncoder) {
//        this.password = passwordEncoder.encode(this.password);
//    }

    //== 유저 필드 업데이트 ==//
    public void updateNickname(String updateNickname) {
        this.nickname = updateNickname;
    }

//    public void updatePassword(String updatePassword, PasswordEncoder passwordEncoder) {
//        this.password = passwordEncoder.encode(updatePassword);
//    }

    public void updateRefreshToken(String updateRefreshToken) {
        this.refreshToken = updateRefreshToken;
    }
}
