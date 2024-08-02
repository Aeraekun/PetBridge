package site.petbridge.domain.petpick.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import site.petbridge.domain.petpick.dto.request.PetPickEditRequestDto;
import site.petbridge.domain.petpick.dto.request.PetPickRegistRequestDto;
import site.petbridge.domain.petpick.dto.response.PetPickResponseDto;
import site.petbridge.domain.petpick.service.PetPickService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/shorts")
@RequiredArgsConstructor
public class PetPickController {

    private final PetPickService petPickService;

    /**
     * 펫픽 등록(권한)
     */
    @PostMapping
    public ResponseEntity<Void> registPetPick(HttpServletRequest httpServletRequest,
                             @RequestPart(name = "petPickRegistRequestDto") PetPickRegistRequestDto petPickRegistRequestDto,
                             @RequestPart(name = "thumbnail", required = false) MultipartFile thumbnailFile,
                             @RequestPart(name = "video", required = false) MultipartFile videoFile) throws Exception {
        petPickService.registPetPick(httpServletRequest, petPickRegistRequestDto, thumbnailFile, videoFile);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    /**
     * 펫픽 랜덤 목록 조회
     *@GetMapping("/{short_id}")
     *     public ResponseEntity<List<PetPickCommentResponseDto>> getListPetPickComment(@PathVariable("short_id") Long petPickId,
     *                                                                                  @RequestParam(defaultValue = "0") int page,
     *                                                                                  @RequestParam(defaultValue = "12") int size) {
     *         List<PetPickCommentResponseDto> petPickCommentResponseDtos = petPickCommentService.getListPetPickComment(petPickId, page, size);
     *
     *         return Optional.ofNullable(petPickCommentResponseDtos)
     *                 .filter(list -> !list.isEmpty())
     *                 .map(ResponseEntity::ok)
     *                 .orElseGet(() -> ResponseEntity.noContent().build());
     *     }
     */
    @GetMapping
    public ResponseEntity<List<PetPickResponseDto>> getRandomListPetPick() {
        List<PetPickResponseDto> petPickResponseDtos = petPickService.getRandomListPetPick();

        return Optional.ofNullable(petPickResponseDtos)
                .filter(list -> !list.isEmpty())
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.noContent().build());
    }

    /**
     * 내가 쓴 펫픽 수정 (권한)
     */
    @PatchMapping("/{id}")
    public ResponseEntity<Long> editPetPick(HttpServletRequest httpServletRequest,
                            @PathVariable("id") Long id,
                            @RequestPart(name = "petPickEditRequestDto") final PetPickEditRequestDto petPickEditRequestDto,
                            @RequestPart(name = "thumbnail", required = false) MultipartFile thumbnailFile) throws Exception {
        Long result = petPickService.update(httpServletRequest, petPickEditRequestDto, id, thumbnailFile);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }



    /**
     * 내가 쓴 펫픽 삭제(권한)
     */
    @PatchMapping("/{id}/disable")
    public ResponseEntity<Long> removePetPick(HttpServletRequest httpServletRequest, @PathVariable("id") Long id) throws Exception {
        Long result = petPickService.delete(httpServletRequest, id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    /**
     * 내가 쓴 펫픽 목록 조회(권한)
     */



}
