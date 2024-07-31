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

@RestController
@RequestMapping("/api/shorts")
@RequiredArgsConstructor
public class PetPickController {

    private final PetPickService petPickService;

    /**
     * 펫픽 등록(권한)
     * 
     * 등록된 정보, 생성된 정보,
     * ResponseEntity
     */
    @PostMapping
    public ResponseEntity<Integer> registPetPick(HttpServletRequest httpServletRequest,
                             @RequestPart(name = "petPickRegistRequestDto") final PetPickRegistRequestDto petPickRegistRequestDto,
                             @RequestPart(name = "thumbnail", required = false) MultipartFile thumbnailFile,
                             @RequestPart(name = "video", required = false) MultipartFile videoFile) throws Exception {
        int result = petPickService.save(httpServletRequest, petPickRegistRequestDto, thumbnailFile, videoFile);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    /**
     * 내가 쓴 펫픽 수정 (권한)
     * 수정 성공 상태 코드
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
     * 펫픽 랜덤 조회
     * 200 + data
     */
    @GetMapping
    public ResponseEntity<PetPickResponseDto> getRandomDetailPetPick() {
        PetPickResponseDto petPickResponseDto = petPickService.getRandomDetailPetPick();
        return new ResponseEntity<>(petPickResponseDto, HttpStatus.OK);
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
