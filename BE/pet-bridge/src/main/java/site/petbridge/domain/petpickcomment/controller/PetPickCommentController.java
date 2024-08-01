package site.petbridge.domain.petpickcomment.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import site.petbridge.domain.petpick.dto.request.PetPickRegistRequestDto;
import site.petbridge.domain.petpickcomment.dto.request.PetPickCommentRegistRequestDto;
import site.petbridge.domain.petpickcomment.service.PetPickCommentService;

@RestController
@RequestMapping("/api/short-comments")
@RequiredArgsConstructor
public class PetPickCommentController {

    private final PetPickCommentService petPickCommentService;

    /**
     * 펫픽 댓글 등록(권한)
     */
//    @PostMapping
//    public int registPetPickComment(HttpServletRequest httpServletRequest,
//                                    @RequestBody PetPickCommentRegistRequestDto) throws Exception {
//        return petPickCommentService.save(httpServletRequest);
//    }
}
