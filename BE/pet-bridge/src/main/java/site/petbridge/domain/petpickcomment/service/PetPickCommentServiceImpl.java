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
import site.petbridge.domain.boardcomment.domain.BoardComment;
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
import site.petbridge.util.AuthUtil;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PetPickCommentServiceImpl implements PetPickCommentService {

    private final UserService userService;
    private final PetPickRepository petPickRepository;
    private final PetPickCommentRepository petPickCommentRepository;
    private final UserRepository userRepository;
    private final AuthUtil authUtil;

    /**
     * 펫픽 댓글 등록(권한)
     */
    @Transactional
    @Override
    public void registPetPickComment(PetPickCommentRegistRequestDto petPickCommentRegistRequestDto) throws Exception {
        User user = authUtil.getAuthenticatedUser();

        // 존재하는 PetPick 아니면 404
        if (!petPickRepository.findByIdAndDisabledFalse(petPickCommentRegistRequestDto.getPetPickId()).isPresent()) {
            throw new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND);
        }

        PetPickComment entity = petPickCommentRegistRequestDto.toEntity(user.getId());
        petPickCommentRepository.save(entity);
    }

    /**
     * 펫픽 ID기반 펫픽 댓글 조회(페이징)
     */
    @Override
    public List<PetPickCommentResponseDto> getListPetPickComment(int petPickId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "registTime"));
        Page<PetPickCommentResponseDto> petPickComments = petPickCommentRepository.findByPetPickIdAndDisabledFalse(petPickId, pageable);

        return petPickComments.getContent();
    }

    /**
     * 펫픽 댓글 수정
     */
    @Transactional
    @Override
    public void editPetPickComment(int id, PetPickCommentEditRequestDto petPickCommentEditRequestDto) throws Exception {
        User user = authUtil.getAuthenticatedUser();

        // 없거나 삭제된 펫픽 댓글 404
        PetPickComment entity = petPickCommentRepository.findByIdAndDisabledFalse(id)
                .orElseThrow(() -> new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND));
        
        // 내 펫픽 댓글 아님 403
        if (entity.getUserId() != user.getId()) {
            throw new PetBridgeException(ErrorCode.FORBIDDEN);
        }

        entity.update(petPickCommentEditRequestDto);
        petPickCommentRepository.save(entity);
    }

    /**
     * 내가 쓴 펫픽 댓글 삭제
     */
    @Transactional
    @Override
    public void removePetPickComment(int id) throws Exception {
        User user = authUtil.getAuthenticatedUser();

        // 없거나 삭제된 펫픽 댓글 404
        PetPickComment entity = petPickCommentRepository.findByIdAndDisabledFalse(id)
                .orElseThrow(() -> new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND));

        // 내 펫픽 댓글 아님 403
        if (entity.getUserId() != user.getId()) {
            throw new PetBridgeException(ErrorCode.FORBIDDEN);
        }

        entity.disable();
        petPickCommentRepository.save(entity);
    }
}
