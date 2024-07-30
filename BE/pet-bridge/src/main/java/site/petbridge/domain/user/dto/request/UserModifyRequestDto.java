package site.petbridge.domain.user.dto.request;

public record UserModifyRequestDto(String password,
                                   String nickname,
                                   String birth,
                                   String phone) {
}
