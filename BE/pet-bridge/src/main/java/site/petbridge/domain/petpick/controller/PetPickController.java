package site.petbridge.domain.petpick.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import site.petbridge.domain.petpick.dto.request.PetPickEditRequestDto;
import site.petbridge.domain.petpick.dto.request.PetPickRegistRequestDto;
import site.petbridge.domain.petpick.dto.response.PetPickResponseDto;
import site.petbridge.domain.petpick.service.PetPickService;
import site.petbridge.global.login.userdetail.CustomUserDetail;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/petpicks")
public class PetPickController {

    private final PetPickService petPickService;

    /**
     * 펫픽 등록
     */
    @PostMapping
    public ResponseEntity<Void> registPetPick(
                             @RequestPart(name = "petPickRegistRequestDto") PetPickRegistRequestDto petPickRegistRequestDto,
                             @RequestPart(name = "thumbnail") MultipartFile thumbnailFile,
                             @RequestPart(name = "video", required = false) MultipartFile videoFile) throws Exception {
        petPickService.registPetPick(petPickRegistRequestDto, thumbnailFile, videoFile);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    /**
     * 펫픽 랜덤 목록 조회
     */
    @GetMapping
    public ResponseEntity<List<PetPickResponseDto>> getRandomListPetPick(
            @RequestParam(name = "initcommentsize", defaultValue = "10") int initCommentSize) throws Exception {
        List<PetPickResponseDto> petPickResponseDtos = petPickService.getRandomListPetPick(initCommentSize);

        return Optional.ofNullable(petPickResponseDtos)
                .filter(list -> !list.isEmpty())
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.noContent().build());
    }

    /**
     * 내가 쓴 펫픽 목록 조회
     */
    @GetMapping("/my")
    public ResponseEntity<List<PetPickResponseDto>> getListMyPetPick(@RequestParam(name = "page", defaultValue = "0") int page,
                                                                     @RequestParam(name = "size", defaultValue = "12") int size,
                                                                     @RequestParam(name = "initcommentsize", defaultValue = "10") int initCommentSize) throws Exception {
        List<PetPickResponseDto> petPickResponseDtos = petPickService.getListMyPetPick(page, size, initCommentSize);

        return Optional.ofNullable(petPickResponseDtos)
                .filter(list -> !list.isEmpty())
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.noContent().build());
    }

    /**
     * 내가 좋아요 한 펫픽 목록 조회
     */
    @GetMapping("/like")
    public ResponseEntity<List<PetPickResponseDto>> getListLikePetPick(@RequestParam(name = "page", defaultValue = "0") int page,
                                                                       @RequestParam(name = "size", defaultValue = "12") int size,
                                                                       @RequestParam(name = "initcommentsize", defaultValue = "10") int initCommentSize) throws Exception {
        List<PetPickResponseDto> petPickResponseDtos = petPickService.getListLikePetPick(page, size, initCommentSize);

        return Optional.ofNullable(petPickResponseDtos)
                .filter(list -> !list.isEmpty())
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.noContent().build());
    }

    /**
     * 펫픽 상세 조회
     */
    @GetMapping("/detail/{id}")
    public ResponseEntity<PetPickResponseDto> getDetailPetPick(@PathVariable(name = "id") int id,
                                                               @RequestParam(name = "initcommentsize", defaultValue = "10") int initCommentSize) throws Exception {
        PetPickResponseDto petPickResponseDto = petPickService.getDetailPetPick(id, initCommentSize);

        return new ResponseEntity<>(petPickResponseDto, HttpStatus.OK);
    }

    /**
     * 내 펫픽 수정
     */
    @PatchMapping("/{id}")
    public ResponseEntity<Void> editPetPick(@PathVariable(name = "id") int id, @RequestPart(name = "petPickEditRequestDto") PetPickEditRequestDto petPickEditRequestDto,
                            @RequestPart(name = "thumbnail", required = false) MultipartFile thumbnailFile) throws Exception {
        petPickService.editPetPick(id, petPickEditRequestDto, thumbnailFile);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /**
     * 내 펫픽 삭제
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removePetPick(@PathVariable(name = "id") int id) throws Exception {
        petPickService.removePetPick(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
