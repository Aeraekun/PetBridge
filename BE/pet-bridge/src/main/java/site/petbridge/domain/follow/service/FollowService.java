package site.petbridge.domain.follow.service;

import jakarta.servlet.http.HttpServletRequest;
import site.petbridge.domain.follow.dto.request.FollowRequestDto;
import site.petbridge.domain.follow.dto.response.FollowResponseDto;
import site.petbridge.domain.petpicklike.dto.request.PetPickLikeRequestDto;

public interface FollowService {

    void registFollow(HttpServletRequest httpServletRequest,
                           FollowRequestDto followRequestDto) throws Exception;

    void deleteFollow(HttpServletRequest httpServletRequest,
                           FollowRequestDto followRequestDto) throws Exception;

    FollowResponseDto getDetailFollow(FollowRequestDto followRequestDto) throws Exception;
}
