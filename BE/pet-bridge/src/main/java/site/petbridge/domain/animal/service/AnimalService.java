package site.petbridge.domain.animal.service;

import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;
import site.petbridge.domain.animal.dto.request.AnimalEditRequestDto;
import site.petbridge.domain.animal.dto.request.AnimalRegistRequestDto;
import site.petbridge.domain.animal.dto.response.AnimalResponseDto;

import java.util.List;

public interface AnimalService {

    void registAnimal(AnimalRegistRequestDto animalRegistRequestDto, MultipartFile imageFile) throws Exception;

    void editAnimal(int id, AnimalEditRequestDto animalEditRequestDto, MultipartFile imageFile) throws Exception;

    void removeAnimal(int id) throws Exception;

    Page<AnimalResponseDto> getListAnimal(int page, int size, String species, String careAddr, String processState) throws Exception;

    List<AnimalResponseDto> getListMyAnimal(int page, int size) throws Exception;

    List<AnimalResponseDto> getListUserAnimal(String userNickname, int page, int size) throws Exception;

    List<AnimalResponseDto> getListFollowAnimal(int page, int size) throws Exception;

    AnimalResponseDto getDetailAnimal(int id, int page, int size) throws Exception;
}
