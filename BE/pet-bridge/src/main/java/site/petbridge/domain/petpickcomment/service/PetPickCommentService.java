package site.petbridge.domain.petpickcomment.service;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.multipart.MultipartFile;
import site.petbridge.domain.petpick.dto.request.PetPickEditRequestDto;
import site.petbridge.domain.petpick.dto.response.PetPickResponseDto;
import site.petbridge.domain.petpickcomment.dto.request.PetPickCommentEditRequestDto;
import site.petbridge.domain.petpickcomment.dto.request.PetPickCommentRegistRequestDto;
import site.petbridge.domain.petpickcomment.dto.response.PetPickCommentResponseDto;

import java.util.List;

public interface PetPickCommentService {

//    /**
//     * 펫픽 댓글 생성
//     */
//    int save(HttpServletRequest httpServletRequest,
//             final PetPickCommentRegistRequestDto petPickCommentRegistRequestDto) throws Exception;
//
//    /**
//     * 펫픽 게시판 id로 펫픽 댓글 조회
//     */
//    List<PetPickCommentResponseDto> findById(Long id) throws Exception;
//
//    /**
//     * 펫픽 댓글 수정
//     */
//    Long update(HttpServletRequest httpServletRequest,
//                final PetPickCommentEditRequestDto petPickCommentEditRequestDto,
//                final Long petPickCommentId) throws Exception;
//
//    /**
//     * 펫픽 댓글 삭제
//     */
//    Long delete(HttpServletRequest httpServletRequest, final Long id) throws Exception;
}
