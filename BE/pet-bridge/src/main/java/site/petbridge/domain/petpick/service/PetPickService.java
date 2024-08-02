package site.petbridge.domain.petpick.service;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.multipart.MultipartFile;
import site.petbridge.domain.petpick.dto.request.PetPickEditRequestDto;
import site.petbridge.domain.petpick.dto.request.PetPickRegistRequestDto;
import site.petbridge.domain.petpick.dto.response.PetPickResponseDto;

import java.util.List;

public interface PetPickService {

    /**
     * 펫픽 생성
     */
    void registPetPick(HttpServletRequest httpServletRequest, final PetPickRegistRequestDto petPickRegistRequestDto, MultipartFile thumbnailFile,
             MultipartFile videoFile) throws Exception;

    /**
     * 펫픽 목록 조회
     */
    List<PetPickResponseDto> getRandomListPetPick();

    /**
     * 펫픽 수정
     */
    Long update(HttpServletRequest httpServletRequest, final PetPickEditRequestDto petPickEditRequestDto,
                final Long petPickId, MultipartFile thumbnailFile) throws Exception;

    /**
     * 펫픽 삭제
     */
    Long delete(HttpServletRequest httpServletRequest, final Long id) throws Exception;

    /**
     * 랜덤 펫픽 조회
     */
//    PetPickResponseDto getRandomDetailPetPick();

}
