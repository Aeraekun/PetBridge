package site.petbridge.domain.animal.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import site.petbridge.domain.animal.domain.Animal;
import site.petbridge.domain.animal.domain.enums.Status;
import site.petbridge.domain.animal.dto.request.AnimalRegistRequestDto;
import site.petbridge.domain.animal.dto.request.AnimalEditRequestDto;
import site.petbridge.domain.animal.dto.response.AnimalResponseDto;
import site.petbridge.domain.animal.repository.AnimalRepository;
import site.petbridge.util.FileUtil;

@Service
@Transactional
@RequiredArgsConstructor
public class AnimalServiceImpl implements AnimalService {

	private final AnimalRepository animalRepository;
	private final FileUtil fileUtil;

	@Override
	public Optional<List<AnimalResponseDto>> getListAnimalByUserId(int userId) {

		Optional<List<Animal>> animals = animalRepository.findByUserId(userId);

		return animals.map(animalList ->
			animalList.stream()
				.map(AnimalResponseDto::transferToAnimalResponseDto
				)
				.collect(Collectors.toList())
		);
	}

	@Override
	public Optional<AnimalResponseDto> getDetailAnimal(int id) {
		Animal animal = animalRepository.findById(id).orElse(null);
		return Optional.ofNullable(AnimalResponseDto.transferToAnimalResponseDto(animal));

	}

	@Override
	public void registAnimal(AnimalRegistRequestDto animalRegistRequestDto, MultipartFile file) throws Exception {
		String filename = null;

		if (file != null) {
			String savedFileName = fileUtil.saveFile(file, "animal");
			if (savedFileName != null) {
				filename = savedFileName;
			}
		}
		Animal animal = Animal.builder()
			.userId(animalRegistRequestDto.getUserId())
			.name(animalRegistRequestDto.getName())
			.filename(filename)
			.happenDt(animalRegistRequestDto.getHappenDt())
			.kindCd(animalRegistRequestDto.getKindCd())
			.colorCd(animalRegistRequestDto.getColorCd())
			.age(animalRegistRequestDto.getAge())
			.weight(animalRegistRequestDto.getWeight())
			.noticeNo(animalRegistRequestDto.getNoticeNo())
			.processState(animalRegistRequestDto.getProcessState())
			.sexCd(animalRegistRequestDto.getSexCd())
			.neuterYn(animalRegistRequestDto.getNeuterYn())
			.specialMark(animalRegistRequestDto.getSpecialMark())
			.careAddr(animalRegistRequestDto.getCareAddr())
			.noticeComment(animalRegistRequestDto.getNoticeComment())
			.build();

		animalRepository.save(animal);
	}

	@Override
	public int editAnimal(int id, AnimalEditRequestDto animalEditRequestDto, MultipartFile file) throws Exception {
		String filename = animalEditRequestDto.getFilename();

		if (animalEditRequestDto.isFilenameRemoved() && filename != null) {
			fileUtil.removeFile("animal", filename);
			filename = null;
		}

		if (file != null) {
			String savedFileName = fileUtil.saveFile(file, "animal");
			if (savedFileName != null) {
				filename = savedFileName;
			}
		}

		Animal animal = animalRepository.findById(id).orElse(null);
		System.out.println(animal);
		if (animal != null) {
			animal.setName(animalEditRequestDto.getName());
			animal.setFilename(filename);
			animal.setHappenDt(animalEditRequestDto.getHappenDt());
			animal.setKindCd(animalEditRequestDto.getKindCd());
			animal.setColorCd(animalEditRequestDto.getColorCd());
			animal.setAge(animalEditRequestDto.getAge());
			animal.setWeight(animalEditRequestDto.getWeight());
			animal.setNoticeNo(animalEditRequestDto.getNoticeNo());
			animal.setProcessState(animalEditRequestDto.getProcessState());
			animal.setSexCd(animalEditRequestDto.getSexCd());
			animal.setNeuterYn(animalEditRequestDto.getNeuterYn());
			animal.setSpecialMark(animalEditRequestDto.getSpecialMark());
			animal.setCareAddr(animalEditRequestDto.getCareAddr());
			animal.setNoticeComment(animalEditRequestDto.getNoticeComment());
			System.out.println(animal);
			animalRepository.save(animal);
			return 1;
		}
		return 0;

	}

	@Override
	public int removeAnimal(int id) throws Exception {
		Animal animal = animalRepository.findById(id).orElse(null);
		if (animal != null) {
			if (animal.getFilename() != null) {
				fileUtil.removeFile("animal", animal.getFilename());
			}
			animalRepository.delete(animal);
			return 1;
		}
		return 0;
	}
}
