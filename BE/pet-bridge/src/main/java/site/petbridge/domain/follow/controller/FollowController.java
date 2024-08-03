package site.petbridge.domain.follow.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.petbridge.domain.follow.dto.request.FollowRequestDto;
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
    public ResponseEntity<Void> registFollow(
            HttpServletRequest httpServletRequest,
            @RequestBody FollowRequestDto followRequestDto) throws Exception {
        followService.registFollow(httpServletRequest, followRequestDto);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    /**
     * 팔로우 삭제
     */
    @DeleteMapping
    public ResponseEntity<Void> deleteFollow(
            HttpServletRequest httpServletRequest,
            @RequestBody FollowRequestDto followRequestDto) throws Exception {
        followService.deleteFollow(httpServletRequest, followRequestDto);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
