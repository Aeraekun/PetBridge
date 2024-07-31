package site.petbridge.domain.user.dto.response;

import lombok.Builder;
import site.petbridge.domain.user.domain.enums.Role;
import site.petbridge.domain.user.domain.enums.SocialType;

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

