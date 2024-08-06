package site.petbridge.domain.animal.controller;

import java.util.List;
import java.util.Optional;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import site.petbridge.domain.animal.dto.request.AnimalEditRequestDto;
import site.petbridge.domain.animal.dto.request.AnimalRegistRequestDto;
import site.petbridge.domain.animal.dto.response.AnimalResponseDto;
import site.petbridge.domain.animal.service.AnimalService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/animals")
public class AnimalController {

    private final AnimalService animalService;

    /**
     * 동물 등록
     */
    @PostMapping
    public ResponseEntity<Void> registAnimal(
            @Valid @RequestPart(name = "animalRegistRequestDto") AnimalRegistRequestDto animalRegistRequestDto,
            @RequestPart(name = "imageFile") MultipartFile imageFile) throws Exception {
        animalService.registAnimal(animalRegistRequestDto, imageFile);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    /**
     * 동물 목록 조회
     */
    @GetMapping
    public ResponseEntity<List<AnimalResponseDto>> getListAnimal(@RequestParam(name = "page") int page,
                                                                 @RequestParam(name = "size") int size,
                                                                 @RequestParam(name = "species", required = false) String species,
                                                                 @RequestParam(name = "careaddr", required = false) String careAddr,
                                                                 @RequestParam(name = "processstate", required = false, defaultValue = "") String processState) throws Exception {
        List<AnimalResponseDto> animalResponseDtos = animalService.getListAnimal(page, size, species, careAddr, processState);

        return Optional.ofNullable(animalResponseDtos)
                .filter(list -> !list.isEmpty())
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.noContent().build());
    }

    /**
     * 내가 등록한(보호중인) 동물 목록 조회
     */
    @GetMapping("/my")
    public ResponseEntity<List<AnimalResponseDto>> getListMyAnimal(@RequestParam(name = "page") int page,
                                                                   @RequestParam(name = "size") int size) throws Exception {
        List<AnimalResponseDto> animalResponseDtos = animalService.getListMyAnimal(page, size);

        return Optional.ofNullable(animalResponseDtos)
                .filter(list -> !list.isEmpty())
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.noContent().build());
    }

    /**
     * 특정 유저(닉네임)가 보호중인 동물 목록 조회
     */
    @GetMapping("/user")
    public ResponseEntity<List<AnimalResponseDto>> getListUserAnimal(@RequestParam(name = "nickname") String userNickname,
                                                                     @RequestParam(name = "page", defaultValue = "0") int page,
                                                                   @RequestParam(name = "size", defaultValue = "12") int size) throws Exception {
        List<AnimalResponseDto> animalResponseDtos = animalService.getListUserAnimal(userNickname, page, size);

        return Optional.ofNullable(animalResponseDtos)
                .filter(list -> !list.isEmpty())
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.noContent().build());
    }

    /**
     * 내가 팔로우 중인 동물 목록 조회
     */
    @GetMapping("/follow")
    public ResponseEntity<List<AnimalResponseDto>> getListFollowAnimal(@RequestParam(name = "page") int page,
                                                                   @RequestParam(name = "size") int size) throws Exception {
        List<AnimalResponseDto> animalResponseDtos = animalService.getListFollowAnimal(page, size);

        return Optional.ofNullable(animalResponseDtos)
                .filter(list -> !list.isEmpty())
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.noContent().build());
    }

    /**
     * 동물 상세 조회
     */
    @GetMapping("/{id}")
    public ResponseEntity<AnimalResponseDto> getDetailAnimal(@PathVariable("id") int id,
                                                             @RequestParam(name = "page", defaultValue = "0") int page,
                                                             @RequestParam(name = "size", defaultValue = "12") int size) throws Exception {
        AnimalResponseDto animalResponseDto = animalService.getDetailAnimal(id, page, size);

        return new ResponseEntity<>(animalResponseDto, HttpStatus.OK);
    }

    /**
     * 내 동물 수정
     */
    @PatchMapping("/{id}")
    public ResponseEntity<Void> editAnimal(@PathVariable("id") int id,
                                           @Valid @RequestPart(name = "animalEditRequestDto") AnimalEditRequestDto animalEditRequestDto,
                                           @RequestPart(name = "imageFile", required = false) MultipartFile imageFile) throws Exception {
        animalService.editAnimal(id, animalEditRequestDto, imageFile);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * 내 동물 삭제
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeAnimal(@PathVariable("id") int id) throws Exception {
        animalService.removeAnimal(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}



