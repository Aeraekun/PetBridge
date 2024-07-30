package site.petbridge.domain.animal.service;

import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import site.petbridge.domain.animal.dto.request.AnimalRegistRequestDto;
import site.petbridge.domain.animal.dto.request.AnimalEditRequestDto;
import site.petbridge.domain.animal.dto.response.AnimalResponseDto;

public interface AnimalService {

    Optional<List<AnimalResponseDto>> getListAnimalByUserId(int userId);

    Optional<AnimalResponseDto> getDetailAnimal(int id);
    void registAnimal(AnimalRegistRequestDto animalRegistRequestDto, MultipartFile file) throws Exception;
    int editAnimal(int id, AnimalEditRequestDto animalEditRequestDto, MultipartFile file) throws Exception;
    int removeAnimal(int id) throws Exception;

}
