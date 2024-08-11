package site.petbridge.domain.petpick.service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import site.petbridge.domain.animal.domain.Animal;
import site.petbridge.domain.animal.repository.AnimalRepository;
import site.petbridge.domain.board.repository.BoardRepository;
import site.petbridge.domain.follow.repository.FollowRepository;
import site.petbridge.domain.petpick.domain.PetPick;
import site.petbridge.domain.petpick.dto.request.PetPickEditRequestDto;
import site.petbridge.domain.petpick.dto.request.PetPickRegistRequestDto;
import site.petbridge.domain.petpick.dto.response.PetPickResponseDto;
import site.petbridge.domain.petpick.repository.PetPickRepository;
import site.petbridge.domain.petpickcomment.dto.response.PetPickCommentResponseDto;
import site.petbridge.domain.petpickcomment.repository.PetPickCommentRepository;
import site.petbridge.domain.petpicklike.repository.PetPickLikeRepository;
import site.petbridge.domain.user.domain.User;
import site.petbridge.domain.user.repository.UserRepository;
import site.petbridge.global.exception.ErrorCode;
import site.petbridge.global.exception.PetBridgeException;
import site.petbridge.global.login.userdetail.CustomUserDetail;
import site.petbridge.util.AuthUtil;
import site.petbridge.util.S3FileUtil;

@Service
@RequiredArgsConstructor
public class PetPickServiceImpl implements PetPickService {

    private final PetPickRepository petPickRepository;
    private final S3FileUtil fileUtil;
    private final PetPickLikeRepository petPickLikeRepository;
    private final PetPickCommentRepository petPickCommentRepository;
    private final FollowRepository followRepository;
    private final UserRepository userRepository;
    private final AuthUtil authUtil;
    private final BoardRepository boardRepository;
    private final AnimalRepository animalRepository;

    /**
     * 펫픽 등록
     */
    @Override
    @Transactional
    public void registPetPick(PetPickRegistRequestDto petPickRegistRequestDto,
                    MultipartFile thumbnailFile, MultipartFile videoFile) throws Exception {
        // null 입력 처리
        if (petPickRegistRequestDto.getAnimalId() == null || petPickRegistRequestDto.getTitle() == null
        || petPickRegistRequestDto.getContent() == null || thumbnailFile == null || videoFile == null) {
            throw new PetBridgeException(ErrorCode.BAD_REQUEST);
        }

        User user = authUtil.getAuthenticatedUser();

        // 태그 동물 외래키 오류
        if (!animalRepository.findByIdAndDisabledFalse(petPickRegistRequestDto.getAnimalId()).isPresent()) {
            throw new PetBridgeException(ErrorCode.BAD_REQUEST);
        }
        // 태그 게시글 외래키 오류 (게시글은 null 들어올 수 있음 고려)
        Integer taggedBoardId = petPickRegistRequestDto.getBoardId();
        if (taggedBoardId != null) {
            if (!boardRepository.findByIdAndDisabledFalse(taggedBoardId).isPresent()) {
                throw new PetBridgeException(ErrorCode.BAD_REQUEST);
            }
        }

        // 등록 진행
        String savedThumbnailFileName = fileUtil.saveFile(thumbnailFile, "images");
        String savedVideoFileName = fileUtil.saveFile(videoFile, "videos");

        PetPick entity = petPickRegistRequestDto.toEntity(user.getId(), savedThumbnailFileName, savedVideoFileName);
        petPickRepository.save(entity);
    }

    /**
     * 펫픽 랜덤 목록 조회
     */
    @Override
    public List<PetPickResponseDto> getRandomListPetPick(int initCommentSize) throws Exception {
        // 쇼츠 조회시 로그인, 비로그인 체크 (조회는 비로그인이여도 예외던지면 안되므로 AuthUtil 사용 X)
        User user = null;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getPrincipal() instanceof CustomUserDetail) {
            CustomUserDetail userDetail = (CustomUserDetail) authentication.getPrincipal();
            user = userRepository.findByIdAndDisabledFalse(userDetail.getId())
                    .orElseThrow(() -> new PetBridgeException(ErrorCode.UNAUTHORIZED));
        }

        // PetPick 랜덤 조회 -> List<PetPick>
        List<PetPick> petPicks = petPickRepository.findRandomPetPicks();

        return getListPetPickResponseDto(petPicks, user, initCommentSize);
    }

    /**
     * 내가 쓴 펫픽 목록 조회
     */
    @Override
    public List<PetPickResponseDto> getListMyPetPick(int page, int size, int initCommentSize) throws Exception {
        User user = authUtil.getAuthenticatedUser();

        Sort sort = Sort.by(Sort.Direction.DESC, "registTime");
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<PetPick> petPicks = petPickRepository.findByUserId(user.getId(), pageable);

        return getListPetPickResponseDto(petPicks.getContent(), user, initCommentSize);
    }

    /**
     * 내가 좋아요한 펫픽 목록 조회
     */
    @Override
    public List<PetPickResponseDto> getListLikePetPick(int page, int size, int initCommentSize) throws Exception {
        User user = authUtil.getAuthenticatedUser();

        Sort sort = Sort.by(Sort.Direction.DESC, "registTime");
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<PetPick> petpicks = petPickRepository.findLikedPetPicksByUserId(user.getId(), pageable);

        return getListPetPickResponseDto(petpicks.getContent(), user, initCommentSize);
    }

    /**
     * List<PetPick> -> List<PetPickResponseDto>
     */
    List<PetPickResponseDto> getListPetPickResponseDto(List<PetPick> petPicks, User user, int initCommentSize) {
        List<PetPickResponseDto> result = petPicks.stream().map(petPick -> {
            return getPetPickResponseDto(petPick, user, initCommentSize);
        }).collect(Collectors.toList());

        return result;
    }

    /**
     * PetPick -> PetPickResponseDto
     * 작성자 정보
     * 좋아요,팔로우 설정
     * 댓글(페이징)
     * 좋아요 개수
     */
    public PetPickResponseDto getPetPickResponseDto(PetPick petPick, User user, int initCommentSize) {
        User petPickWriter = userRepository.findById(petPick.getUserId()).orElse(null);
        String petPickWriterNickname = petPickWriter.getNickname();
        String petPickWriterImage = petPickWriter.getImage();

        // 펫픽 좋아요 여부, 동물 팔로우 여부 확인
        boolean isLiking = false;
        boolean isFollowing = false;
        // 로그인 된 유저일 경우
        if (user != null) {
            int userId = user.getId();
            isLiking = petPickLikeRepository.existsByUserIdAndPetPickId(userId, petPick.getId());
            isFollowing = followRepository.existsByUserIdAndAnimalId(userId, petPick.getAnimalId());
        }

        // 댓글 페이징 처리
        Sort sort = Sort.by(Sort.Direction.ASC, "registTime");
        Pageable pageable = PageRequest.of(0, initCommentSize, sort);
        List<PetPickCommentResponseDto> comments = petPickCommentRepository.findByPetPickIdAndDisabledFalse(petPick.getId(), pageable).stream()
                .collect(Collectors.toList());

        // 좋아요 개수
        int likeCnt = petPickLikeRepository.countByPetPickId(petPick.getId());

        return new PetPickResponseDto(petPick, petPickWriterNickname, petPickWriterImage, likeCnt, isLiking, isFollowing, comments);
    }


    /**
     * 펫픽 상세 조회
     */
    public PetPickResponseDto getDetailPetPick(int id, int initCommentSize) throws Exception {
        // 쇼츠 상세 조회시 로그인, 비로그인 체크 (조회는 비로그인이여도 예외던지면 안되므로 AuthUtil 사용 X)
        User user = null;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getPrincipal() instanceof CustomUserDetail) {
            CustomUserDetail userDetail = (CustomUserDetail) authentication.getPrincipal();
            user = userRepository.findByIdAndDisabledFalse(userDetail.getId())
                    .orElseThrow(() -> new PetBridgeException(ErrorCode.UNAUTHORIZED));
        }

        // PetPick 없거나 삭제됐을 경우 404, 그거만 아니면 다 보여주면됨.
        PetPick petPick = petPickRepository.findByIdAndDisabledFalse(id)
                .orElseThrow(() -> new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND));

        return getPetPickResponseDto(petPick, user, initCommentSize);
    }

    /**
     *  펫핏 수정
     */
    @Override
    @Transactional
    public void editPetPick(int petPickId, PetPickEditRequestDto petPickEditRequestDto, MultipartFile thumbnailFile) throws Exception {
        // null 입력 처리
        if (petPickEditRequestDto.getAnimalId() == null || petPickEditRequestDto.getTitle() == null
                || petPickEditRequestDto.getContent() == null) {
            throw new PetBridgeException(ErrorCode.BAD_REQUEST);
        }

        // 유저 정보
        User user = authUtil.getAuthenticatedUser();
        
        // 없거나 삭제된 펫픽에 대한 요청일 경우 404
        PetPick entity = petPickRepository.findByIdAndDisabledFalse(petPickId)
                .orElseThrow(() -> new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND));

        // 내가 쓴 펫픽이 아닌 경우 403
        if (user.getId() != entity.getUserId()) {
            throw new PetBridgeException(ErrorCode.FORBIDDEN);
        }

        // 태그 동물 외래키 오류
        if (!animalRepository.findByIdAndDisabledFalse(petPickEditRequestDto.getAnimalId()).isPresent()) {
            throw new PetBridgeException(ErrorCode.BAD_REQUEST);
        }
        // 태그 게시글 외래키 오류 (게시글은 null 들어올 수 있음 고려)
        Integer taggedBoardId = petPickEditRequestDto.getBoardId();
        if (taggedBoardId != null) {
            if (!boardRepository.findByIdAndDisabledFalse(taggedBoardId).isPresent()) {
                throw new PetBridgeException(ErrorCode.BAD_REQUEST);
            }
        }

        // 수정 진행
        if (thumbnailFile != null && !thumbnailFile.isEmpty()) {
            String savedThumbnailFileName = fileUtil.saveFile(thumbnailFile, "images");
            entity.setThumbnail(savedThumbnailFileName);
        }

        entity.update(petPickEditRequestDto);
        petPickRepository.save(entity);
    }

    /**
     * 펫픽 삭제
     */
    @Transactional
    @Override
    public void removePetPick(int petPickId) throws Exception {
        User user = authUtil.getAuthenticatedUser();

        // 없거나 삭제된 펫픽에 대한 요청일 경우 404
        PetPick entity = petPickRepository.findByIdAndDisabledFalse(petPickId)
                .orElseThrow(() -> new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND));

        // 내가 쓴 펫픽이 아닌 경우 403
        if (user.getId() != entity.getUserId()) {
            throw new PetBridgeException(ErrorCode.FORBIDDEN);
        }

        entity.disable();
        petPickRepository.save(entity);
    }
}
