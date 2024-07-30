package site.petbridge.domain.user.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.petbridge.domain.user.dto.request.UserModifyRequestDto;
import site.petbridge.domain.user.dto.request.UserSignUpRequestDto;
import site.petbridge.domain.user.dto.response.UserResponseDto;
import site.petbridge.domain.user.service.UserService;
import site.petbridge.global.jwt.service.JwtService;

import java.util.Optional;

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
    public ResponseEntity<UserResponseDto> editUser(HttpServletRequest httpServletRequest, @RequestBody UserModifyRequestDto userModifyRequestDto) throws Exception {
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

    @GetMapping("/api/users/jwt-test")
    public String jwtTest() { return "jwtTest 요청 성공"; }
}
