package site.petbridge.domain.user.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

public record UserSignUpRequestDto(String email,
                                   String password,
                                   String nickname,
                                   String birth,
                                   String phone) {
}
