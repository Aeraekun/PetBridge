package site.petbridge.domain.follow.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.petbridge.domain.follow.dto.request.FollowRequestDto;
import site.petbridge.domain.follow.dto.response.FollowResponseDto;
import site.petbridge.domain.follow.service.FollowService;
import site.petbridge.domain.petpicklike.dto.request.PetPickLikeRequestDto;
import site.petbridge.domain.petpicklike.service.PetPickLikeService;

@RestController
@RequestMapping("/api/follows")
@RequiredArgsConstructor
public class FollowController {

    private final FollowService followService;

    /**
     * 팔로우 등록
     */
    @PostMapping
    public ResponseEntity<Void> registFollow(@RequestBody FollowRequestDto followRequestDto) throws Exception {
        followService.registFollow(followRequestDto);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    /**
     * 팔로우 삭제
     */
    @DeleteMapping
    public ResponseEntity<Void> deleteFollow(@RequestBody FollowRequestDto followRequestDto) throws Exception {
        followService.deleteFollow(followRequestDto);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /**
     * 팔로우 조회
     */
    @GetMapping("/{id}")
    public ResponseEntity<FollowResponseDto> getDetailFollow(@PathVariable(name = "id") int id) throws Exception {
        FollowResponseDto followResponseDto = followService.getDetailFollow(id);

        return new ResponseEntity<>(followResponseDto, HttpStatus.OK);
    }
}
