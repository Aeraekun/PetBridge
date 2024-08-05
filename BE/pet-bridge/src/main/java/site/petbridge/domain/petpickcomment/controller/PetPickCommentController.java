package site.petbridge.domain.petpickcomment.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.petbridge.domain.petpickcomment.dto.request.PetPickCommentEditRequestDto;
import site.petbridge.domain.petpickcomment.dto.request.PetPickCommentRegistRequestDto;
import site.petbridge.domain.petpickcomment.dto.response.PetPickCommentResponseDto;
import site.petbridge.domain.petpickcomment.service.PetPickCommentService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/petpick-comments")
@RequiredArgsConstructor
public class PetPickCommentController {

    private final PetPickCommentService petPickCommentService;

    /**
     * 펫픽 댓글 등록(권한)
     */
    @PostMapping
    public ResponseEntity<Void> registPetPickComment (
            HttpServletRequest httpServletRequest,
            @RequestBody PetPickCommentRegistRequestDto petPickCommentRegistRequestDto) throws Exception {
        petPickCommentService.registPetPickComment(httpServletRequest, petPickCommentRegistRequestDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    /**
     * 펫픽 id로 펫픽 댓글 목록 조회 (페이징 처리)
     */
    @GetMapping("/{petpick_id}")
    public ResponseEntity<List<PetPickCommentResponseDto>> getListPetPickComment(@PathVariable("short_id") Long petPickId,
                                                                                 @RequestParam(defaultValue = "0") int page,
                                                                                 @RequestParam(defaultValue = "12") int size) {
        List<PetPickCommentResponseDto> petPickCommentResponseDtos = petPickCommentService.getListPetPickComment(petPickId, page, size);

        return Optional.ofNullable(petPickCommentResponseDtos)
                .filter(list -> !list.isEmpty())
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.noContent().build());
    }

    /**
     * 펫픽 댓글 수정(권한)
     */
    @PatchMapping("/{id}")
    public ResponseEntity<Void> editPetPickComment (
            HttpServletRequest httpServletRequest,
            @PathVariable("id") Long id,
            @RequestBody PetPickCommentEditRequestDto petPickCommentEditRequestDto
            ) throws Exception {

        petPickCommentService.editPetPickComment(httpServletRequest, id, petPickCommentEditRequestDto);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /**
     * 내가 쓴 펫픽 댓글 삭제(권한)
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removePetPickComment(HttpServletRequest httpServletRequest, @PathVariable("id") Long id) throws Exception {
        petPickCommentService.removePetPickComment(httpServletRequest, id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
