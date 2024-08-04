package site.petbridge.domain.petpickcomment.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import site.petbridge.domain.petpick.domain.PetPick;
import site.petbridge.domain.petpick.dto.request.PetPickEditRequestDto;
import site.petbridge.domain.petpick.dto.request.PetPickRegistRequestDto;
import site.petbridge.domain.petpick.dto.response.PetPickResponseDto;
import site.petbridge.domain.petpick.repository.PetPickRepository;
import site.petbridge.domain.petpickcomment.domain.PetPickComment;
import site.petbridge.domain.petpickcomment.dto.request.PetPickCommentEditRequestDto;
import site.petbridge.domain.petpickcomment.dto.request.PetPickCommentRegistRequestDto;
import site.petbridge.domain.petpickcomment.dto.response.PetPickCommentResponseDto;
import site.petbridge.domain.petpickcomment.repository.PetPickCommentRepository;
import site.petbridge.domain.user.domain.User;
import site.petbridge.domain.user.dto.response.UserResponseDto;
import site.petbridge.domain.user.repository.UserRepository;
import site.petbridge.domain.user.service.UserService;
import site.petbridge.global.exception.ErrorCode;
import site.petbridge.global.exception.PetBridgeException;
import site.petbridge.global.login.userdetail.CustomUserDetail;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PetPickCommentServiceImpl implements PetPickCommentService {

    private final UserService userService;
    private final PetPickRepository petPickRepository;
    private final PetPickCommentRepository petPickCommentRepository;
    private final UserRepository userRepository;

    /**
     * 펫픽 댓글 등록(권한)
     */
    @Transactional
    @Override
    public void registPetPickComment(HttpServletRequest httpServletRequest, PetPickCommentRegistRequestDto petPickCommentRegistRequestDto) throws Exception {

        // 회원 정보
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        int userId = ((CustomUserDetail) authentication.getPrincipal()).getId();
        User user = userRepository.findByIdAndDisabledFalse(userId)
                .orElseThrow(() -> new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND));

        PetPickComment entity = petPickCommentRegistRequestDto.toEntity(user.getId());

        // 존재하는 PetPick에 대한 요청인지 확인
        boolean exists = petPickRepository.existsById((long) petPickCommentRegistRequestDto.getPetPickId());
        if (!exists) {
            throw new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND);
        }

        petPickCommentRepository.save(entity);
    }

    /**
     * 펫픽 ID기반 펫픽 댓글 조회(페이징)
     */
    @Override
    public List<PetPickCommentResponseDto> getListPetPickComment(Long petPickId, int page, int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "registTime"));
        Page<PetPickCommentResponseDto> petPickComments = petPickCommentRepository.findByPetPickId(petPickId, pageable);

        return petPickComments.getContent();
    }

    /**
     * 펫픽 수정
     */
    @Transactional
    @Override
    public void editPetPickComment(HttpServletRequest httpServletRequest, Long id, PetPickCommentEditRequestDto petPickCommentEditRequestDto) throws Exception {

        // 회원 정보
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        int userId = ((CustomUserDetail) authentication.getPrincipal()).getId();
        User user = userRepository.findByIdAndDisabledFalse(userId)
                .orElseThrow(() -> new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND));

        // 해당 id 펫픽 댓글 없을 때
        PetPickComment entity = petPickCommentRepository.findById(id)
                .orElseThrow(() -> new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND));

        // 내가 작성한 댓글 아니거나, 삭제된 펫픽 댓글일 때
        if (user.getId() != entity.getUserId() || entity.isDisabled()) {
            throw new PetBridgeException(ErrorCode.FORBIDDEN);
        }

        entity.update(petPickCommentEditRequestDto.getContent());
    }

    /**
     * 내가 쓴 펫픽 댓글 삭제
     */
    @Transactional
    @Override
    public void removePetPickComment(HttpServletRequest httpServletRequest, Long id) throws Exception {

        // 회원 정보
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        int userId = ((CustomUserDetail) authentication.getPrincipal()).getId();
        User user = userRepository.findByIdAndDisabledFalse(userId)
                .orElseThrow(() -> new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND));

        // 해당 id 펫픽 댓글 없을 때
        PetPickComment entity = petPickCommentRepository.findById(id)
                .orElseThrow(() -> new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND));

        // 내가 작성한 댓글 아니거나, 삭제된 펫픽 댓글일 때
        if (user.getId() != entity.getUserId() || entity.isDisabled()) {
            throw new PetBridgeException(ErrorCode.FORBIDDEN);
        }

        entity.disable();
    }
}
