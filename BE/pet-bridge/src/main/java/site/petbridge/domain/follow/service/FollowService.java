package site.petbridge.domain.follow.service;

import jakarta.servlet.http.HttpServletRequest;
import site.petbridge.domain.follow.dto.request.FollowRequestDto;
import site.petbridge.domain.follow.dto.response.FollowResponseDto;
import site.petbridge.domain.petpicklike.dto.request.PetPickLikeRequestDto;

public interface FollowService {

    void registFollow(FollowRequestDto followRequestDto) throws Exception;

    void deleteFollow(FollowRequestDto followRequestDto) throws Exception;

    FollowResponseDto getDetailFollow(int id) throws Exception;
}
