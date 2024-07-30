package site.petbridge.domain.user.dto.response;

import lombok.Builder;
import site.petbridge.domain.user.domain.enums.Role;
import site.petbridge.domain.user.domain.enums.SocialType;

/**
 * @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
 *     @Column(name = "id")
 *     private int id;
 *
 *     private String email;
 *     private String password;
 *     private String nickname;
 *     private String birth;
 *     private String phone;
 *     private String image;
 *     private boolean disabled = false;
 *
 *     @Enumerated(EnumType.STRING)
 *     private Role role;
 *
 *     @Enumerated(EnumType.STRING)
 *     @Column(name = "social_type")
 *     private SocialType socialType; // KAKAO, NAVER, GOOGLE
 *
 *     @Column(name = "social_id")
 *     private String socialId; // 로그인한 소셜 타입의 식별자 값 (일반 로그인의 경우 null)
 *
 *     @Column(name = "refresh_token")
 *     private String refreshToken;
 */

@Builder
public record UserResponseDto(int id,
                              String email,
                              String nickname,
                              String birth,
                              String phone,
                              String image,
                              boolean disabled,
                              Role role,
                              SocialType socialType,
                              String socialId) {
}

