package site.petbridge.domain.user.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.petbridge.domain.user.domain.User;
import site.petbridge.domain.user.domain.enums.Role;

import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserSignUpRequestDto {

    @NotNull @Email
    private String email;
    @NotNull
    private String password;
    @NotNull
    private String nickname;
    @NotNull
    private LocalDate birth;
    @NotNull
    private String phone;

    public User toEntity() {
        return User.builder()
                .email(email)
                .password(password)
                .nickname(nickname)
                .birth(birth)
                .role(Role.USER)
                .build();
    }
}
