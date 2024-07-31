package site.petbridge.domain.petpick.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import site.petbridge.domain.petpick.domain.PetPick;
import site.petbridge.domain.petpick.dto.request.PetPickEditRequestDto;
import site.petbridge.domain.petpick.dto.request.PetPickRegistRequestDto;
import site.petbridge.domain.petpick.dto.response.PetPickResponseDto;
import site.petbridge.domain.petpick.repository.PetPickRepository;
import site.petbridge.domain.user.domain.User;
import site.petbridge.domain.user.dto.response.UserResponseDto;
import site.petbridge.domain.user.repository.UserRepository;
import site.petbridge.domain.user.service.UserService;
import site.petbridge.global.exception.ErrorCode;
import site.petbridge.global.exception.PetBridgeException;
import site.petbridge.global.jwt.service.JwtService;
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

    /**
     * 펫픽 등록
     */
    @Override
    @Transactional
    public int save(HttpServletRequest httpServletRequest, final PetPickRegistRequestDto petPickRegistRequestDto,
                    MultipartFile thumbnailFile, MultipartFile videoFile) throws Exception {

        // 미인증
        UserResponseDto userResponseDto = userService.isValidTokenUser(httpServletRequest).orElse(null);
        if (userResponseDto == null) {
            throw new PetBridgeException(ErrorCode.UNAUTHORIZED);
        }

        String savedThumbnailFileName = null;
        String savedVideoFileName = null;

        if (thumbnailFile != null) {
            savedThumbnailFileName = fileUtil.saveFile(thumbnailFile, "petpick");
        }

        if (videoFile != null) {
            savedVideoFileName = fileUtil.saveFile(videoFile, "petpick");
        }

        PetPick entity = petPickRegistRequestDto.toEntity(userResponseDto.id(), savedThumbnailFileName, savedVideoFileName);
        petPickRepository.save(entity);

        return entity.getId();
    }

    /**
     * 펫픽 목록 조회
     */
    @Override
    public List<PetPickResponseDto> findAll() {

        Sort sort = Sort.by(Sort.Direction.DESC, "id", "registTime");
        List<PetPick> list = petPickRepository.findAll(sort);
        return list.stream().map(PetPickResponseDto::new).collect(Collectors.toList());
    }

    /**
     *  펫핏 수정
     */
    @Override
    @Transactional
    public Long update(HttpServletRequest httpServletRequest, final PetPickEditRequestDto petPickEditRequestDto,
                       final Long petPickId, MultipartFile thumbnailFile) throws Exception {

        // 미인증
        UserResponseDto userResponseDto = userService.isValidTokenUser(httpServletRequest).orElse(null);
        if (userResponseDto == null) {
            throw new PetBridgeException(ErrorCode.UNAUTHORIZED);
        }

        String savedThumbnailFileName = null;
        if (thumbnailFile != null) {
            savedThumbnailFileName = fileUtil.saveFile(thumbnailFile, "petpick");
        }

        // 펫픽 없을 때
        PetPick entity = petPickRepository.findById(petPickId).orElseThrow(() -> new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND));
        // 내가 작성한 쇼츠가 아닐 때
        if (userResponseDto.id() != entity.getUserId()) {
            throw new PetBridgeException(ErrorCode.FORBIDDEN);
        }

        // 조회했는데 삭제된 펫픽일 때
        if (entity.isDisabled()) {
            throw new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND);
        }

        entity.update(petPickEditRequestDto.getBoardId(),
                petPickEditRequestDto.getTitle(),
                savedThumbnailFileName,
                petPickEditRequestDto.getContent());

        return petPickId;
    }

    /**
     * 펫픽 삭제
     */
    @Transactional
    @Override
    public Long delete(HttpServletRequest httpServletRequest, final Long petPickId) throws Exception {

        // 미인증
        UserResponseDto userResponseDto = userService.isValidTokenUser(httpServletRequest).orElse(null);
        if (userResponseDto == null) {
            throw new PetBridgeException(ErrorCode.UNAUTHORIZED);
        }

        // 펫픽 없을 때
        PetPick entity = petPickRepository.findById(petPickId).orElseThrow(() -> new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND));
        // 내가 작성한 쇼츠가 아닐 때
        if (userResponseDto.id() != entity.getUserId()) {
            throw new PetBridgeException(ErrorCode.FORBIDDEN);
        }

        entity.disable();

        return petPickId;
    }

    /**
     * 랜덤 펫픽 조회
     */
    @Override
    public PetPickResponseDto getRandomDetailPetPick() {

        // 펫픽 없을 때
        PetPick petPick = petPickRepository.findRandomPetPick()
                .orElseThrow(() -> new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND));

        System.out.println("petPick.getId() = " + petPick.getId());
        return new PetPickResponseDto(petPick);
    }


}
