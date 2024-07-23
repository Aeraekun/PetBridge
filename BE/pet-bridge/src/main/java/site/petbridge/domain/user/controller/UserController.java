package site.petbridge.domain.user.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import site.petbridge.domain.user.dto.UserSignUpDto;
import site.petbridge.domain.user.service.UserService;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/api/users/sign-up")
    public String signUp(@RequestBody UserSignUpDto userSignUpDto) throws Exception {
        System.out.println("들어옴");
        userService.signUp(userSignUpDto);
        return "회원가입 성공";
    }

    @GetMapping("/api/users/jwt-test")
    public String jwtTest() { return "jwtTest 요청 성공"; }
}
