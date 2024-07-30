package site.petbridge.domain.user.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import site.petbridge.domain.board.dto.response.BoardResponseDto;
import site.petbridge.domain.user.domain.enums.Role;
import site.petbridge.domain.user.domain.User;
import site.petbridge.domain.user.dto.request.UserModifyRequestDto;
import site.petbridge.domain.user.dto.request.UserSignUpRequestDto;
import site.petbridge.domain.user.dto.response.UserResponseDto;
import site.petbridge.domain.user.repository.UserRepository;
import site.petbridge.global.jwt.service.JwtService;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    public Optional<UserResponseDto> registUser(UserSignUpRequestDto userSignUpRequestDto) throws Exception{

        if (userRepository.findByEmail(userSignUpRequestDto.email()).isPresent()) {
            throw new Exception("이미 존재하는 이메일입니다.");
        }

        if (userRepository.findByNickname(userSignUpRequestDto.nickname()).isPresent()) {
            throw new Exception("이미 존재하는 닉네임입니다.");
        }

        User user = User.builder()
                .email(userSignUpRequestDto.email())
                .password(userSignUpRequestDto.password())
                .nickname(userSignUpRequestDto.nickname())
                .birth(userSignUpRequestDto.birth())
                .phone(userSignUpRequestDto.phone())
                .role(Role.USER)
                .build();

        user.passwordEncode(passwordEncoder);
        return Optional.ofNullable(userRepository.save(user).transferToUserResponseDto());
    }

    @Override
    public Optional<UserResponseDto> getDetailMyUser(HttpServletRequest httpServletRequest) throws Exception {
        String accessToken = jwtService.extractAccessToken(httpServletRequest).orElse(null);
        String email = jwtService.extractEmail(accessToken).orElse(null);

        return Optional.ofNullable(userRepository.findByEmail(email).orElseThrow().transferToUserResponseDto());
    }

    @Override
    public Optional<UserResponseDto> editUser(HttpServletRequest httpServletRequest, UserModifyRequestDto userModifyRequestDto) throws Exception {
        String accessToken = jwtService.extractAccessToken(httpServletRequest).orElse(null);
        String email = jwtService.extractEmail(accessToken).orElse(null);
        if (email == null) {
            throw new Exception("Invalid token");
        }

        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getSocialType() == null) {
                user.updateUserInfo(userModifyRequestDto);
                user.passwordEncode(passwordEncoder);
            } else {
                user.updateSocialUserInfo(userModifyRequestDto);
            }
            return Optional.ofNullable(user.transferToUserResponseDto());
        } else {
            throw new Exception("user not found");
        }
    }

    @Override
    public Optional<UserResponseDto> removeUser(HttpServletRequest httpServletRequest) throws Exception {
        String accessToken = jwtService.extractAccessToken(httpServletRequest).orElse(null);
        String email = jwtService.extractEmail(accessToken).orElse(null);
        if (email == null) {
            throw new Exception("Invalid token");
        }

        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.disableUser();
            return Optional.ofNullable(user.transferToUserResponseDto());
        } else {
            throw new Exception("user not found");
        }
    }

    @Override
    public Optional<UserResponseDto> getDetailUserByEmail(String email) throws Exception {
        return Optional.ofNullable(userRepository.findByEmail(email).orElseThrow().transferToUserResponseDto());
    }

}
