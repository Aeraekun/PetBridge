package site.petbridge.domain.petpick.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import site.petbridge.domain.petpick.dto.request.PetPickEditRequestDto;
import site.petbridge.domain.petpick.dto.request.PetPickRegistRequestDto;
import site.petbridge.domain.petpick.dto.response.PetPickResponseDto;
import site.petbridge.domain.petpick.service.PetPickService;

import java.util.List;

@RestController
@RequestMapping("/api/shorts")
@RequiredArgsConstructor
public class PetPickController {

    private final PetPickService petPickService;

    /**
     * 펫픽 등록(권한)
     */
    @PostMapping
    public int registPetPick(HttpServletRequest httpServletRequest,
                             @RequestPart(name = "petPickRegistRequestDto") final PetPickRegistRequestDto petPickRegistRequestDto,
                             @RequestPart(name = "thumbnail", required = false) MultipartFile thumbnailFile,
                             @RequestPart(name = "video", required = false) MultipartFile videoFile) throws Exception {
        return petPickService.save(httpServletRequest, petPickRegistRequestDto, thumbnailFile, videoFile);
    }

    /**
     * 내가 쓴 펫픽 수정 (권한)
     */
    @PatchMapping("/{id}")
    public Long editPetPick(HttpServletRequest httpServletRequest,
                            @PathVariable("id") Long id,
                            @RequestPart(name = "petPickEditRequestDto") final PetPickEditRequestDto petPickEditRequestDto,
                            @RequestPart(name = "thumbnail", required = false) MultipartFile thumbnailFile) throws Exception {
        return petPickService.update(httpServletRequest, petPickEditRequestDto, id, thumbnailFile);
    }

    /**
     * 펫픽 랜덤 조회
     */
    @GetMapping
    public PetPickResponseDto getRandomDetailPetPick() {
        return petPickService.getRandomDetailPetPick();
    }

    /**
     * 내가 쓴 펫픽 삭제(권한)
     */
    @PatchMapping("/{id}/disable")
    public Long removePetPick(HttpServletRequest httpServletRequest, @PathVariable("id") Long id) throws Exception {
        return petPickService.delete(httpServletRequest, id);
    }

    /**
     * 내가 쓴 펫픽 목록 조회(권한)
     */



}
