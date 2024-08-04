package site.petbridge.domain.user.dto.response;

import lombok.Builder;
import lombok.Getter;
import site.petbridge.domain.user.domain.User;
import site.petbridge.domain.user.domain.enums.Role;
import site.petbridge.domain.user.domain.enums.SocialType;

import java.time.LocalDate;

@Getter
public class UserResponseDto {
    private int id;
    private String email;
    private String nickname;
    private LocalDate birth;
    private String phone;
    private String image;
    private Role role;
    private SocialType socialType;
    private String socialId;
    private String refreshToken;
    private boolean disabled;

    public UserResponseDto(User entity) {
        this.id = entity.getId();
        this.email = entity.getEmail();
        this.nickname = entity.getNickname();
        this.birth = entity.getBirth();
        this.phone = entity.getPhone();
        this.image = entity.getImage();
        this.role = entity.getRole();
        this.socialType = entity.getSocialType();
        this.socialId = entity.getSocialId();
        this.refreshToken = entity.getRefreshToken();
        this.disabled = entity.isDisabled();
    }
}

