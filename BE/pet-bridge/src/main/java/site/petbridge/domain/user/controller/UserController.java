package site.petbridge.domain.user.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import site.petbridge.domain.user.dto.request.EmailRequestDto;
import site.petbridge.domain.user.dto.request.UserModifyRequestDto;
import site.petbridge.domain.user.dto.request.UserSignUpRequestDto;
import site.petbridge.domain.user.dto.response.UserResponseDto;
import site.petbridge.domain.user.service.UserService;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/api/users/sign-up")
    public ResponseEntity<Void> registUser(@RequestBody UserSignUpRequestDto userSignUpRequestDto) throws Exception {
        userService.registUser(userSignUpRequestDto);
        return ResponseEntity.status((HttpStatus.CREATED)).build();
    }

    @GetMapping("/api/users/info")
    public ResponseEntity<UserResponseDto> getDetailMyUser(HttpServletRequest httpServletRequest) throws Exception {
        return userService.getDetailMyUser(httpServletRequest)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.status(HttpStatus.NO_CONTENT).build());
    }

    @PatchMapping("/api/users/modify")
    public ResponseEntity<UserResponseDto> editUser(HttpServletRequest httpServletRequest,
        @RequestBody UserModifyRequestDto userModifyRequestDto) throws Exception {
        return userService.editUser(httpServletRequest, userModifyRequestDto)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.status(HttpStatus.NO_CONTENT).build());
    }

    @PatchMapping("/api/users/delete")
    public ResponseEntity<UserResponseDto> removeUser(HttpServletRequest httpServletRequest) throws Exception {
        return userService.removeUser(httpServletRequest)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.status(HttpStatus.NO_CONTENT).build());
    }

    @PostMapping("/api/users/find/email")
    public ResponseEntity<UserResponseDto> getDetailUserByEmail(@RequestBody EmailRequestDto emailRequestDto) throws
        Exception {
        return userService.getDetailUserByEmail(emailRequestDto.email())
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.status(HttpStatus.NO_CONTENT).build());
    }

    @PostMapping("/api/users/authentication/email")
    public ResponseEntity<UserResponseDto> sendEmailAuthenticationCode(
        @RequestBody EmailRequestDto emailRequestDto) throws Exception {
        System.out.println("요청들어왔따");
        if (userService.checkEmailDuplicate(emailRequestDto)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        userService.sendEmailAuthenticationCode(emailRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();

    }

    @GetMapping("/api/users/authentication/email")
    public ResponseEntity<UserResponseDto> checkEmailAuthenticationCode(
        @RequestBody EmailRequestDto emailRequestDto) throws Exception {
        if (userService.checkEmailDuplicate(emailRequestDto)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        if (!userService.checkEmailAuthenticationCode(emailRequestDto)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.status(HttpStatus.OK).build();

    }

    @GetMapping("/api/users/jwt-test")
    public String jwtTest() {
        return "jwtTest 요청 성공";
    }
}
