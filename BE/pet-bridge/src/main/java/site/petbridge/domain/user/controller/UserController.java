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

    /**
     * // 사용자 정보 호출 API
     *
     * @return
     * @GetMapping("/info") public ApiResponse<UserResponseDto> getUserInformation(HttpServletRequest httpServletRequest) throws Exception {
     * log.info("[user info call]");
     * String accessToken = jwtService.extractAccessToken(httpServletRequest).orElse(null);
     * try {
     * Long userId = jwtService.extractUserId(accessToken).orElse(null);
     * log.info("[user info] userId : {}", userId);
     * UserResponseDto userResponseDto = userService.searchUserByUserId(userId).transferToUserResponseDto();
     * return new ApiResponse<>(200, true, userResponseDto, "사용자 정보 불러오기 성공");
     * } catch (Exception e) {
     * log.error("Error fetching user information", e);
     * throw NotExistUserException.EXCEPTION;
     * }
     * }
     */

    @GetMapping("/api/users/info")
    public Optional<UserResponseDto> getDetailMyUser(HttpServletRequest httpServletRequest) throws Exception {
        return userServiceImpl.getDetailMyUser(httpServletRequest);
    }

//    @PostMapping("/api/users/login")
//    public ResponseEntity<Void> loginUser(@RequestBody UserLoginRequestDto userLoginRequestDto) {
//        Optional<User> user = userServiceImpl.loginUser(userLoginRequestDto.email(), userLoginRequestDto.password());
//
//        return user.map(ResponseEntity::ok).orElseGet()
//    }

//    @PatchMapping()
//    public ResponseEntity<Void> modifyAttractionBoard(@RequestBody AttractionBoardAddRequestDto attractionBoardAddRequestDto){
//        log.info("[modifyAttractionBoard] attractionBoardAddRequestDto : {}",attractionBoardAddRequestDto);
//        if ( attractionBoardService.modifyAttractionBoard(attractionBoardAddRequestDto) == 0 ){
//            return ResponseEntity.badRequest().build();
//        }
//        return ResponseEntity.ok().build();
//    }

    @GetMapping("/api/users/jwt-test")
    public String jwtTest() { return "jwtTest 요청 성공"; }
}
