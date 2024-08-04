package site.petbridge.domain.user.service;

import java.util.List;
import java.util.Optional;

import jakarta.mail.internet.MimeMessage;
import org.springframework.web.multipart.MultipartFile;
import site.petbridge.domain.user.dto.request.EmailRequestDto;
import site.petbridge.domain.user.dto.request.UserEditRequestDto;
import site.petbridge.domain.user.dto.request.UserSignUpRequestDto;
import site.petbridge.domain.user.dto.response.UserResponseDto;

public interface UserService {

//    Optional<UserResponseDto> isValidTokenUser(HttpServletRequest httpServletRequest) throws Exception;

    void registUser(UserSignUpRequestDto userSignUpRequestDto) throws Exception;

    List<UserResponseDto> getListUser(int page, int size) throws Exception;

    UserResponseDto getDetailMyUser() throws Exception;

    UserResponseDto getDetailUserByNickname(String nickname) throws Exception;

    void editUser(UserEditRequestDto userEditRequestDto, MultipartFile imageFile) throws Exception;

    void removeUser() throws Exception;

    void removeUserAdmin(int id) throws Exception;

    Optional<UserResponseDto> getDetailUserByEmail(String email) throws Exception;

    boolean checkEmailDuplicate(EmailRequestDto emailRequestDto) throws Exception;

    MimeMessage CreateMail(String mail, int code);

    void sendEmailAuthenticationCode(EmailRequestDto emailRequestDto) throws Exception;

    boolean checkEmailAuthenticationCode(EmailRequestDto emailRequestDto) throws Exception;

}
