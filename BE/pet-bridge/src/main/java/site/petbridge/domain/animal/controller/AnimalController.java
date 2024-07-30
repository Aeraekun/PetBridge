package site.petbridge.domain.animal.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
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

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AnimalResponseDto>> getListAnimalByUserId(@PathVariable("userId") int userId) {
        return animalService.getListAnimalByUserId(userId)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.status(HttpStatus.NO_CONTENT).build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnimalResponseDto> getDetailAnimal(@PathVariable("id") int id) {
        return animalService.getDetailAnimal(id)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.status(HttpStatus.NO_CONTENT).build());
    }

    @PostMapping
    public ResponseEntity<Void> registAnimal (
    @RequestPart(name = "animalRegistRequestDto") AnimalRegistRequestDto animalRegistRequestDto,
    @RequestPart(name = "file", required = false) MultipartFile file) throws Exception{
        animalService.registAnimal(animalRegistRequestDto, file);
        return ResponseEntity.status((HttpStatus.CREATED)).build();
    }

	@PatchMapping("/{id}")
	public ResponseEntity<Void> editAnimal (
		@PathVariable("id") int id,
		@RequestPart(name = "animalEditRequestDto") AnimalEditRequestDto animalEditRequestDto,
		@RequestPart(name = "file", required = false) MultipartFile file) throws Exception{
		if(animalService.editAnimal(id, animalEditRequestDto, file) == 0){
			ResponseEntity.status((HttpStatus.BAD_REQUEST)).build();
		}
		return ResponseEntity.status((HttpStatus.OK)).build();
	}

    @PatchMapping("/{id}/disable")
    public ResponseEntity<Void> removeBoard(@PathVariable("id") int id) throws Exception {
        try {
            animalService.removeAnimal(id);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return ResponseEntity.noContent().build();

    }




}



