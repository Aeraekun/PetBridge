package site.petbridge.domain.user.domain;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import site.petbridge.domain.user.domain.enums.Role;
import site.petbridge.domain.user.domain.enums.SocialType;
import site.petbridge.domain.user.dto.response.UserResponseDto;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@ToString
@Table(name = "users")
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    private String email;
    private String password;
    private String nickname;
    private String birth;
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

    @Builder
    public User(String email,
                String nickname,
                String password,
                String birth,
                String phone,
                String image,
                boolean disabled,
                Role role,
                SocialType socialType,
                String socialId
                ) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.birth = birth;
        this.phone = phone;
        this.image = image;
        this.disabled = disabled;
        this.role = role;
        this.socialType = socialType;
        this.socialId = socialId;
    }

    public static User createUser(
            String email,
            String nickname,
            boolean disabled,
            Role role
    ){
        return builder()
                .email(email)
                .nickname(nickname)
                .disabled(disabled)
                .role(role)
                .build();
    }

    public UserResponseDto transferToUserResponseDto(){
        return UserResponseDto.builder()
                .id(id)
                .email(email)
                .nickname(nickname)
                .birth(birth)
                .phone(phone)
                .image(image)
                .disabled(disabled)
                .role(role)
                .socialType(socialType)
                .socialId(socialId)
                .build();
    }

    // 유저 권한 설정 메소드
    public void authorizeSocialUser() { this.role = Role.USER; }

   // 비밀번호 암호화 메소드
    public void passwordEncode(PasswordEncoder passwordEncoder) {
        this.password = passwordEncoder.encode(this.password);
    }

    //== 유저 필드 업데이트 ==//
    public void updateNickname(String updateNickname) {
        this.nickname = updateNickname;
    }

    public void updatePassword(String updatePassword, PasswordEncoder passwordEncoder) {
        this.password = passwordEncoder.encode(updatePassword);
    }

    public void updateRefreshToken(String updateRefreshToken) {
        this.refreshToken = updateRefreshToken;
    }
}
