package site.petbridge.domain.follow.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import site.petbridge.domain.animal.repository.AnimalRepository;
import site.petbridge.domain.follow.domain.Follow;
import site.petbridge.domain.follow.dto.request.FollowRequestDto;
import site.petbridge.domain.follow.repository.FollowRepository;
import site.petbridge.domain.petpicklike.domain.PetPickLike;
import site.petbridge.domain.user.domain.User;
import site.petbridge.domain.user.dto.response.UserResponseDto;
import site.petbridge.domain.user.repository.UserRepository;
import site.petbridge.domain.user.service.UserService;
import site.petbridge.global.exception.ErrorCode;
import site.petbridge.global.exception.PetBridgeException;
import site.petbridge.global.login.userdetail.CustomUserDetail;
import site.petbridge.util.AuthUtil;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FollowServiceImpl implements FollowService {

    private final UserService userService;
    private final FollowRepository followRepository;
    private final AnimalRepository animalRepository;
    private final UserRepository userRepository;
    private final AuthUtil authUtil;

    @Transactional
    @Override
    public void registFollow(HttpServletRequest httpServletRequest, FollowRequestDto followRequestDto) throws Exception {

        User user = authUtil.getAuthenticatedUser();

        // 존재하는 animal에 대한 요청인지 확인
        boolean exists = animalRepository.existsById((long) followRequestDto.getAnimalId());
        if (!exists) {
            throw new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND);
        }

        Optional<Follow> existingFollow = followRepository.findByUserIdAndAnimalId(
                user.getId(), followRequestDto.getAnimalId());
        // 이미 팔로우가 되어 있는 경우
        if (existingFollow.isPresent()) {
            throw new PetBridgeException(ErrorCode.CONFLICT);
        }

        Follow entity = followRequestDto.toEntity(user.getId());
        followRepository.save(entity);
    }

    @Transactional
    @Override
    public void deleteFollow(HttpServletRequest httpServletRequest, FollowRequestDto followRequestDto) throws Exception {

        User user = authUtil.getAuthenticatedUser();

        // 존재하는 animal에 대한 요청인지 확인
        boolean exists = animalRepository.existsById((long) followRequestDto.getAnimalId());
        if (!exists) {
            throw new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND);
        }

        Optional<Follow> existingFollow = followRepository.findByUserIdAndAnimalId(
                user.getId(), followRequestDto.getAnimalId());
        // 팔로우 없는 경우
        if (!existingFollow.isPresent()) {
            throw new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND);
        }

        followRepository.delete(existingFollow.get());
    }
}
