package site.petbridge.domain.petpicklike.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import site.petbridge.domain.petpick.repository.PetPickRepository;
import site.petbridge.domain.petpicklike.domain.PetPickLike;
import site.petbridge.domain.petpicklike.dto.request.PetPickLikeRequestDto;
import site.petbridge.domain.petpicklike.repository.PetPickLikeRepository;
import site.petbridge.domain.user.domain.User;
import site.petbridge.domain.user.dto.response.UserResponseDto;
import site.petbridge.domain.user.repository.UserRepository;
import site.petbridge.domain.user.service.UserService;
import site.petbridge.global.exception.ErrorCode;
import site.petbridge.global.exception.PetBridgeException;
import site.petbridge.global.login.userdetail.CustomUserDetail;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PetPickLikeServiceImpl implements PetPickLikeService {

    private final UserService userService;
    private final PetPickRepository petPickRepository;
    private final PetPickLikeRepository petPickLikeRepository;
    private final UserRepository userRepository;

    @Transactional
    @Override
    public void registPetPickLike(HttpServletRequest httpServletRequest,
                                  PetPickLikeRequestDto petPickLikeRequestDto) throws Exception {

        // 회원 정보
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        int userId = ((CustomUserDetail) authentication.getPrincipal()).getId();
        User user = userRepository.findByIdAndDisabledFalse(userId)
                .orElseThrow(() -> new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND));

        // 존재하는 PetPick에 대한 요청인지 확인
        boolean exists = petPickRepository.existsById((long) petPickLikeRequestDto.getPetPickId());
        if (!exists) {
            throw new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND);
        }

        Optional<PetPickLike> existingPetPickLike = petPickLikeRepository.findByUserIdAndPetPickId(
                user.getId(), petPickLikeRequestDto.getPetPickId());
        // 이미 좋아요가 되어 있는 경우
        if (existingPetPickLike.isPresent()) {
            throw new PetBridgeException(ErrorCode.CONFLICT);
        }

        PetPickLike entity = petPickLikeRequestDto.toEntity(user.getId());
        petPickLikeRepository.save(entity);
    }

    @Transactional
    @Override
    public void deletePetPickLike(HttpServletRequest httpServletRequest,
                                  PetPickLikeRequestDto petPickLikeRequestDto) throws Exception {
        // 회원 정보
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        int userId = ((CustomUserDetail) authentication.getPrincipal()).getId();
        User user = userRepository.findByIdAndDisabledFalse(userId)
                .orElseThrow(() -> new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND));

        // 존재하는 PetPick에 대한 요청인지 확인
        boolean exists = petPickRepository.existsById((long) petPickLikeRequestDto.getPetPickId());
        if (!exists) {
            throw new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND);
        }

        Optional<PetPickLike> existingPetPickLike = petPickLikeRepository.findByUserIdAndPetPickId(
                user.getId(), petPickLikeRequestDto.getPetPickId());
        // 좋아요 없는 경우
        if (!existingPetPickLike.isPresent()) {
            throw new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND);
        }

        petPickLikeRepository.delete(existingPetPickLike.get());
    }
}
