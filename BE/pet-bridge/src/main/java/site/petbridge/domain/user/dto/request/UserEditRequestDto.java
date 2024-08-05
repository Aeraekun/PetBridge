package site.petbridge.domain.user.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.petbridge.domain.user.domain.User;

import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserEditRequestDto {

    @NotNull
    private String password;
    @NotNull
    private String nickname;
    @NotNull
    private LocalDate birth;
    @NotNull
    private String phone;

    public User toEntity(String image) {
        return User.builder()
                .password(password)
                .nickname(nickname)
                .birth(birth)
                .phone(phone)
                .image(image)
                .build();
    }
}
