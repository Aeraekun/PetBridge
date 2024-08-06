package site.petbridge.domain.petpick.service;

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
import site.petbridge.domain.animal.repository.AnimalRepository;
import site.petbridge.domain.board.repository.BoardRepository;
import site.petbridge.domain.follow.repository.FollowRepository;
import site.petbridge.domain.follow.service.FollowService;
import site.petbridge.domain.petpick.domain.PetPick;
import site.petbridge.domain.petpick.dto.request.PetPickEditRequestDto;
import site.petbridge.domain.petpick.dto.request.PetPickRegistRequestDto;
import site.petbridge.domain.petpick.dto.response.PetPickResponseDto;
import site.petbridge.domain.petpick.repository.PetPickRepository;
import site.petbridge.domain.petpickcomment.domain.PetPickComment;
import site.petbridge.domain.petpickcomment.dto.response.PetPickCommentResponseDto;
import site.petbridge.domain.petpickcomment.repository.PetPickCommentRepository;
import site.petbridge.domain.petpicklike.repository.PetPickLikeRepository;
import site.petbridge.domain.user.domain.User;
import site.petbridge.domain.user.dto.response.UserResponseDto;
import site.petbridge.domain.user.repository.UserRepository;
import site.petbridge.domain.user.service.UserService;
import site.petbridge.global.exception.ErrorCode;
import site.petbridge.global.exception.PetBridgeException;
import site.petbridge.global.jwt.service.JwtService;
import site.petbridge.global.login.userdetail.CustomUserDetail;
import site.petbridge.util.AuthUtil;
import site.petbridge.util.FileUtil;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PetPickServiceImpl implements PetPickService {

    private final PetPickRepository petPickRepository;
    private final FileUtil fileUtil;
    private final UserService userService;
    private final PetPickLikeRepository petPickLikeRepository;
    private final PetPickCommentRepository petPickCommentRepository;
    private final FollowRepository followRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthUtil authUtil;
    private final BoardRepository boardRepository;
    private final AnimalRepository animalRepository;

    /**
     * 펫픽 등록
     */
    @Override
    @Transactional
    public void registPetPick(HttpServletRequest httpServletRequest, final PetPickRegistRequestDto petPickRegistRequestDto,
                    MultipartFile thumbnailFile, MultipartFile videoFile) throws Exception {

        User user = authUtil.getAuthenticatedUser();

        if (!boardRepository.findById(petPickRegistRequestDto.getBoardId()).isPresent()) {
            throw new PetBridgeException(ErrorCode.BAD_REQUEST);
        }

        if (!animalRepository.findById(petPickRegistRequestDto.getAnimalId()).isPresent()) {
            throw new PetBridgeException(ErrorCode.BAD_REQUEST);
        }

        String savedThumbnailFileName = null;
        String savedVideoFileName = null;

        if (thumbnailFile != null) {
            savedThumbnailFileName = fileUtil.saveFile(thumbnailFile, "petpick");
        }

        if (videoFile != null) {
            savedVideoFileName = fileUtil.saveFile(videoFile, "petpick");
        }

        PetPick entity = petPickRegistRequestDto.toEntity(user.getId(), savedThumbnailFileName, savedVideoFileName);
        petPickRepository.save(entity);
    }

    /**
     * 펫픽 랜덤 목록 조회
     */
    @Override
    public List<PetPickResponseDto> getRandomListPetPick(HttpServletRequest httpServletRequest,
                                                         int initCommentSize) throws Exception {
        User user = null;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getPrincipal() instanceof CustomUserDetail) {
            CustomUserDetail userDetail = (CustomUserDetail) authentication.getPrincipal();
            user = userRepository.findByIdAndDisabledFalse(userDetail.getId())
                    .orElseThrow(() -> new PetBridgeException(ErrorCode.UNAUTHORIZED));
        }
        final User finalUser = user;

        List<PetPick> petPicks = petPickRepository.findRandomPetPicks();

        return petPicks.stream().map(petPick -> {
            User petPickWriter = userRepository.findById(petPick.getUserId()).orElse(null);
            String petPickWriterNickname = petPickWriter.getNickname();
            String petPickWriterImage = petPickWriter.getImage();

            // 펫픽 좋아요, 팔로우 여부 확인
            boolean isLiking = false;
            boolean isFollowing = false;
            // 로그인시
            if (finalUser != null) {
                int userId = finalUser.getId();
                isLiking = petPickLikeRepository.existsByUserIdAndPetPickId(userId, petPick.getId());
                isFollowing = followRepository.existsByUserIdAndAnimalId(userId, petPick.getAnimalId());
            }

            Sort sort = Sort.by(Sort.Direction.DESC, "registTime");
            Pageable pageable = PageRequest.of(0, initCommentSize, sort); // 최신순 페이징 initCommentSize 개수만큼
            List<PetPickCommentResponseDto> comments = petPickCommentRepository.findByPetPickId((long) petPick.getId(), pageable).stream()
                    .collect(Collectors.toList());

            int likeCnt = petPickLikeRepository.countByPetPickId(petPick.getId());

            return new PetPickResponseDto(petPick, petPickWriterNickname, petPickWriterImage, likeCnt, isLiking, isFollowing, comments);
        }).collect(Collectors.toList());
    }

    /**
     * 내가 쓴 펫픽 목록 조회
     */
    @Override
    public List<PetPickResponseDto> getListMyPetPick(HttpServletRequest httpServletRequest, int page, int size,
                                                     int initCommentSize) throws Exception {

        User user = authUtil.getAuthenticatedUser();

        Sort sort = Sort.by(Sort.Direction.DESC, "registTime");
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<PetPick> petpicks = petPickRepository.findByUserId(user.getId(), pageable);

        return getListPetPickResponseDtoByConditions(petpicks.getContent(), new UserResponseDto(user), initCommentSize);
    }

    /**
     * 내가 좋아요한 펫픽 목록 조회
     */
    @Override
    public List<PetPickResponseDto> getListLikePetPick(HttpServletRequest httpServletRequest, int page, int size, int initCommentSize) throws Exception {

        User user = authUtil.getAuthenticatedUser();

        Sort sort = Sort.by(Sort.Direction.DESC, "registTime");
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<PetPick> petpicks = petPickRepository.findLikedPetPicksByUserId(user.getId(), pageable);

        return getListPetPickResponseDtoByConditions(petpicks.getContent(), new UserResponseDto(user), initCommentSize);
    }

    /**
     * paging 된 내가 쓴 글, 좋아요한 글 petpick 가져온 후,
     * 작성자 정보 설정, 좋아요,팔로우 설정 및 댓글 페이징 처리 메소드
     */
    List<PetPickResponseDto> getListPetPickResponseDtoByConditions(List<PetPick> petPicks, UserResponseDto userResponseDto,
                                                                   int initCommentSize) {

        List<PetPickResponseDto> result = petPicks.stream().map(petPick -> {
            User petPickWriter = userRepository.findById(petPick.getUserId()).orElse(null);
            String petPickWriterNickname = petPickWriter.getNickname();
            String petPickWriterImage = petPickWriter.getImage();

            // 펫픽 좋아요, 팔로우 여부 확인
            boolean isLiking = false;
            boolean isFollowing = false;
            // 로그인 된 유저일 경우
            if (userResponseDto != null) {
                int userId = userResponseDto.getId();
                isLiking = petPickLikeRepository.existsByUserIdAndPetPickId(userId, petPick.getId());
                isFollowing = followRepository.existsByUserIdAndAnimalId(userId, petPick.getAnimalId());
            }

            Sort sort = Sort.by(Sort.Direction.DESC, "registTime");
            Pageable pageable = PageRequest.of(0, initCommentSize, sort);
            List<PetPickCommentResponseDto> comments = petPickCommentRepository.findByPetPickId((long) petPick.getId(), pageable).stream()
                    .collect(Collectors.toList());

            int likeCnt = petPickLikeRepository.countByPetPickId(petPick.getId());

            return new PetPickResponseDto(petPick, petPickWriterNickname, petPickWriterImage, likeCnt, isLiking, isFollowing, comments);
        }).collect(Collectors.toList());

        return result;
    }

    /**
     * 펫픽 상세 조회
     */
    public PetPickResponseDto getDetailPetPick(int id) throws Exception {

        // 해당 id 펫픽
        PetPick petPick = petPickRepository.findByIdAndDisabledFalse(id)
                .orElseThrow(() -> new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND));

        User petPickWriter = userRepository.findById(petPick.getUserId()).orElse(null);
        String petPickWriterNickname = petPickWriter.getNickname();
        String petPickWriterImage = petPickWriter.getImage();

        int likeCnt = petPickLikeRepository.countByPetPickId(id);

        List<PetPickCommentResponseDto> comments = petPickCommentRepository.findByPetPickIdAndDisabledFalse(id).stream()
                .map(petPickComment -> {
                    User user = userRepository.findByIdAndDisabledFalse(petPickComment.getUserId())
                            .orElseThrow(() -> new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND));
                    return new PetPickCommentResponseDto(petPickComment, user.getNickname(), user.getImage());
                })
                .collect(Collectors.toList());

        return new PetPickResponseDto(petPick, petPickWriterNickname, petPickWriterImage, likeCnt, false, false, comments);
    }

    /**
     *  펫핏 수정
     */
    @Override
    @Transactional
    public void editPetPick(HttpServletRequest httpServletRequest, PetPickEditRequestDto petPickEditRequestDto,
                            Long petPickId, MultipartFile thumbnailFile) throws Exception {

        User user = authUtil.getAuthenticatedUser();
        // 펫픽 없을 때
        PetPick entity = petPickRepository.findById(petPickId).orElseThrow(() -> new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND));
        // 내가 작성한 펫픽이 아닐 때
        if (user.getId() != entity.getUserId()) {
            throw new PetBridgeException(ErrorCode.FORBIDDEN);
        }
        // 조회했는데 삭제된 펫픽일 때
        if (entity.isDisabled()) {
            throw new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND);
        }

        String savedThumbnailFileName = null;
        if (thumbnailFile != null) {
            savedThumbnailFileName = fileUtil.saveFile(thumbnailFile, "petpick");
        }

        entity.update(petPickEditRequestDto.getBoardId(),
                petPickEditRequestDto.getTitle(),
                savedThumbnailFileName,
                petPickEditRequestDto.getContent());
    }

    /**
     * 펫픽 삭제
     */
    @Transactional
    @Override
    public void delete(HttpServletRequest httpServletRequest, final Long petPickId) throws Exception {

        User user = authUtil.getAuthenticatedUser();

        // 펫픽 없을 때
        PetPick entity = petPickRepository.findById(petPickId).orElseThrow(() -> new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND));

        // 내가 작성한 쇼츠가 아닐 때
        if (user.getId() != entity.getUserId()) {
            throw new PetBridgeException(ErrorCode.FORBIDDEN);
        }

        // 이미 삭제된 쇼츠일 때
        if (entity.isDisabled()) {
            throw new PetBridgeException(ErrorCode.CONFLICT);
        }

        entity.disable();
    }


}
