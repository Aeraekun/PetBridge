package site.petbridge.domain.petpicklike.service;

import jakarta.servlet.http.HttpServletRequest;
import site.petbridge.domain.petpicklike.dto.request.PetPickLikeRequestDto;
import site.petbridge.domain.petpicklike.dto.response.PetPickLikeResponseDto;

public interface PetPickLikeService {

    void registPetPickLike(PetPickLikeRequestDto petPickLikeRequestDto) throws Exception;

    void deletePetPickLike(PetPickLikeRequestDto petPickLikeRequestDto) throws Exception;

    PetPickLikeResponseDto getDetailPetPickLike(int id) throws Exception;
}
