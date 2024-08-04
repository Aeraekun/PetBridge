package site.petbridge.domain.user.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;
import site.petbridge.domain.user.dto.request.EmailRequestDto;
import site.petbridge.domain.user.dto.request.PhoneRequestDto;
import site.petbridge.domain.user.dto.request.UserEditRequestDto;
import site.petbridge.domain.user.dto.request.UserSignUpRequestDto;
import site.petbridge.domain.user.dto.response.UserResponseDto;
import site.petbridge.domain.user.service.UserService;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    /**
     * 회원 가입
     */
    @PostMapping("/sign-up")
    public ResponseEntity<Void> registUser(@Valid @RequestBody UserSignUpRequestDto userSignUpRequestDto) throws Exception {
        userService.registUser(userSignUpRequestDto);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    /**
     * 회원 전체 목록 조회(관리자)
     */
    @GetMapping
    public ResponseEntity<List<UserResponseDto>> getListUser(@RequestParam(name = "page") int page,
                                                       @RequestParam(name = "size") int size) throws Exception {
        List<UserResponseDto> userResponseDtos = userService.getListUser(page, size);

        return Optional.ofNullable(userResponseDtos)
                .filter(list -> !list.isEmpty())
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.noContent().build());
    }


    /**
     * 내 회원정보 상세 조회
     */
    @GetMapping("/info")
    public ResponseEntity<UserResponseDto> getDetailMyUser() throws Exception {
        UserResponseDto userResponseDto = userService.getDetailMyUser();

        return new ResponseEntity<>(userResponseDto, HttpStatus.OK);
    }

    /**
     * 닉네임 중복 체크
     */
    @GetMapping("/{nickname}")
    public ResponseEntity<UserResponseDto> getDetailUserByNickname(@PathVariable String nickname) throws Exception {
        UserResponseDto userResponseDto = userService.getDetailUserByNickname(nickname);

        return new ResponseEntity<>(userResponseDto, HttpStatus.OK);
    }

    /**
     * 회원 정보 수정
     */
    @PatchMapping
    public ResponseEntity<Void> editUser(@Valid @RequestPart(name = "userEditRequestDto")UserEditRequestDto userEditRequestDto,
                                         @RequestPart(name = "imageFile", required = false) MultipartFile imageFile) throws Exception {
        userService.editUser(userEditRequestDto, imageFile);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * 회원 탈퇴
     */
    @DeleteMapping
    public ResponseEntity<Void> removeUser() throws Exception {
        userService.removeUser();

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /**
     * 회원 삭제(관리자)
     */
    @DeleteMapping("{id}")
    public ResponseEntity<Void> removeUserAdmin(@PathVariable("id") int id) throws Exception {
        userService.removeUserAdmin(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/find/email")
    public ResponseEntity<UserResponseDto> getDetailUserByEmail(@RequestBody EmailRequestDto emailRequestDto) throws
        Exception {
        return userService.getDetailUserByEmail(emailRequestDto.email())
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.status(HttpStatus.NO_CONTENT).build());
    }

    @PostMapping("/authentication/email")
    public ResponseEntity<UserResponseDto> sendEmailAuthenticationCode(
        @RequestBody EmailRequestDto emailRequestDto) throws Exception {
        System.out.println("요청들어왔따");
        if (userService.checkEmailDuplicate(emailRequestDto)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        userService.sendEmailAuthenticationCode(emailRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();

    }

    @PostMapping("/authentication/email/check")
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


    @PostMapping("/api/users/authentication/phone")
    public ResponseEntity<Void> sendPhoneAuthenticationCode(
        @RequestBody PhoneRequestDto phoneRequestDto) throws Exception {
        System.out.println("요청들어왔따");

        userService.sendPhoneAuthenticationCode(phoneRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();

    }

    @PostMapping("/api/users/authentication/phone/check")
    public ResponseEntity<Void> checkPhoneAuthenticationCode(
        @RequestBody PhoneRequestDto phoneRequestDto) throws Exception {
        if (!userService.checkPhoneAuthenticationCode(phoneRequestDto)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.status(HttpStatus.OK).build();

    }
}
