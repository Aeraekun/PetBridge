package site.petbridge.domain.petpicklike.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.petbridge.domain.petpicklike.dto.request.PetPickLikeRequestDto;
import site.petbridge.domain.petpicklike.dto.response.PetPickLikeResponseDto;
import site.petbridge.domain.petpicklike.service.PetPickLikeService;

@RestController
@RequestMapping("/api/petpick-likes")
@RequiredArgsConstructor
public class PetPickLikeController {

    private final PetPickLikeService petPickLikeService;

    /**
     * 펫픽 좋아요 등록
     */
    @PostMapping
    public ResponseEntity<Void> registPetPickLike(
            HttpServletRequest httpServletRequest,
            @RequestBody PetPickLikeRequestDto petPickLikeRequestDto) throws Exception {
        petPickLikeService.registPetPickLike(httpServletRequest, petPickLikeRequestDto);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    /**
     * 펫픽 좋아요 삭제
     */
    @DeleteMapping
    public ResponseEntity<Void> deletePetPickLike(
            HttpServletRequest httpServletRequest,
            @RequestBody PetPickLikeRequestDto petPickLikeRequestDto) throws Exception {
        petPickLikeService.deletePetPickLike(httpServletRequest, petPickLikeRequestDto);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /**
     * 펫핏 좋아요 조회
     */
    @GetMapping("/{id}")
    public ResponseEntity<PetPickLikeResponseDto> getDetailPetPickLike(
            @PathVariable(name = "id") int id) throws Exception {
        PetPickLikeResponseDto petPickLikeResponseDto = petPickLikeService.getDetailPetPickLike(id);

        return new ResponseEntity<>(petPickLikeResponseDto, HttpStatus.OK);
    }
}
