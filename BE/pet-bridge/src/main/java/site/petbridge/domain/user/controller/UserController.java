package site.petbridge.domain.user.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.petbridge.domain.user.dto.request.UserSignUpRequestDto;
import site.petbridge.domain.user.dto.response.UserResponseDto;
import site.petbridge.domain.user.service.UserService;
import site.petbridge.global.jwt.service.JwtService;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userServiceImpl;
    private final JwtService jwtService;

    /**
     @PostMapping
     public ResponseEntity<Void> registBoard (
     @RequestPart(name = "boardAddRequestDto") BoardAddRequestDto boardAddRequestDto,
     @RequestPart(name = "file", required = false) MultipartFile file) throws Exception{
     System.out.println("컨트롤러 요청 들어옴");
     boardService.registBoard(boardAddRequestDto, file);
     System.out.println("컨트롤러 요청 처리 완료. 클라이언트 전송");
     return ResponseEntity.status((HttpStatus.CREATED)).build();
     }
     */

    @PostMapping("/api/users/sign-up")
    public ResponseEntity<Void> registUser(@RequestBody UserSignUpRequestDto userSignUpRequestDto) throws Exception {
        userServiceImpl.registUser(userSignUpRequestDto);

        return ResponseEntity.status((HttpStatus.CREATED)).build();
    }

    @GetMapping("/api/users/info")
    public ResponseEntity<UserResponseDto> getDetailMyUser(HttpServletRequest httpServletRequest) throws Exception {
        return userServiceImpl.getDetailMyUser(httpServletRequest)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NO_CONTENT).build());
    }

    /**
     * // 사용자 정보 수정 API
     *     @PutMapping
     *     public ApiResponse<UserResponseDto> modifyUserInformation(@RequestBody UserModifyRequestDto userModifyRequestDto, HttpServletRequest httpServletRequest){
     *         log.info("[user info modify]");
     *         String accessToken = jwtService.extractAccessToken(httpServletRequest).orElse(null);
     *         try {
     *             Long userId = jwtService.extractUserId(accessToken).orElse(null);
     *             log.info("[user info] userId : {}", userId);
     *             UserResponseDto userResponseDto = userService.updateUser(userId, userModifyRequestDto);
     *             return new ApiResponse<>(200, true, userResponseDto, "사용자 정보 수정 성공");
     *         } catch (Exception e) {
     *             log.error("Error fetching user information", e);
     *             throw NotExistUserException.EXCEPTION;
     *         }
     *     }
     */
    @PatchMapping("/api/users/modify")




    @GetMapping("/api/users/jwt-test")
    public String jwtTest() { return "jwtTest 요청 성공"; }
}
