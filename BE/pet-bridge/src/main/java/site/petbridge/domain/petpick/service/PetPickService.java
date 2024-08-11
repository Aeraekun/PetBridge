package site.petbridge.domain.petpick.service;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.multipart.MultipartFile;
import site.petbridge.domain.petpick.dto.request.PetPickEditRequestDto;
import site.petbridge.domain.petpick.dto.request.PetPickRegistRequestDto;
import site.petbridge.domain.petpick.dto.response.PetPickResponseDto;
import site.petbridge.domain.user.domain.User;

import java.util.List;

public interface PetPickService {

    /**
     * 펫픽 생성
     */
    void registPetPick(PetPickRegistRequestDto petPickRegistRequestDto, MultipartFile thumbnailFile, MultipartFile videoFile) throws Exception;

    /**
     * 펫픽 랜덤 목록 조회
     */
    List<PetPickResponseDto> getRandomListPetPick(int initCommentSize) throws Exception;

    /**
     * 내가 쓴 펫픽 목록 조회
     */
    List<PetPickResponseDto> getListMyPetPick(int page, int size, int initCommentSize) throws Exception;

    /**
     * 내가 좋아요한 펫픽 목록 조회
     */
    List<PetPickResponseDto> getListLikePetPick(int page, int size, int initCommentSize) throws Exception;

    /**
     * 펫픽 상세 조회
     */
    PetPickResponseDto getDetailPetPick(int id, int initCommentSize) throws Exception;

    /**
     * 내 펫픽 수정
     */
    void editPetPick(int petPickId, PetPickEditRequestDto petPickEditRequestDto, MultipartFile thumbnailFile) throws Exception;

    /**
     * 내 펫픽 삭제
     */
    void removePetPick(int petPickId) throws Exception;


}
