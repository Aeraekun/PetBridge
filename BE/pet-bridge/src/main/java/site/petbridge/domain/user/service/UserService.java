package site.petbridge.domain.user.service;

import java.util.Optional;

import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpServletRequest;
import site.petbridge.domain.user.dto.request.EmailRequestDto;
import site.petbridge.domain.user.dto.request.UserModifyRequestDto;
import site.petbridge.domain.user.dto.request.UserSignUpRequestDto;
import site.petbridge.domain.user.dto.response.UserResponseDto;

public interface UserService {

    Optional<UserResponseDto> registUser(UserSignUpRequestDto userSignUpRequestDto) throws Exception;

    Optional<UserResponseDto> getDetailMyUser(HttpServletRequest httpServletRequest) throws Exception;

    Optional<UserResponseDto> editUser(HttpServletRequest httpServletRequest,
        UserModifyRequestDto userModifyRequestDto) throws Exception;

    Optional<UserResponseDto> removeUser(HttpServletRequest httpServletRequest) throws Exception;

    Optional<UserResponseDto> getDetailUserByEmail(String email) throws Exception;

    boolean checkEmailDuplicate(EmailRequestDto emailRequestDto) throws Exception;

    MimeMessage CreateMail(String mail, int code);

    void sendEmailAuthenticationCode(EmailRequestDto emailRequestDto) throws Exception;

    boolean checkEmailAuthenticationCode(EmailRequestDto emailRequestDto) throws Exception;

}
