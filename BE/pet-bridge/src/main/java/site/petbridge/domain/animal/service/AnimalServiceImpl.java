package site.petbridge.domain.animal.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import site.petbridge.domain.animal.domain.Animal;
import site.petbridge.domain.animal.dto.request.AnimalEditRequestDto;
import site.petbridge.domain.animal.dto.request.AnimalRegistRequestDto;
import site.petbridge.domain.animal.dto.response.AnimalResponseDto;
import site.petbridge.domain.animal.repository.AnimalRepository;
import site.petbridge.domain.board.service.BoardService;
import site.petbridge.domain.contract.domain.Contract;
import site.petbridge.domain.contract.repository.ContractRepository;
import site.petbridge.domain.follow.repository.FollowRepository;
import site.petbridge.domain.user.domain.User;
import site.petbridge.domain.user.repository.UserRepository;
import site.petbridge.global.exception.ErrorCode;
import site.petbridge.global.exception.PetBridgeException;
import site.petbridge.util.AuthUtil;
import site.petbridge.util.FileUtil;
import site.petbridge.util.S3FileUtil;

@Service
@RequiredArgsConstructor
public class AnimalServiceImpl implements AnimalService {

	private final BoardService boardService;
	private final AnimalRepository animalRepository;
	private final UserRepository userRepository;
	private final ContractRepository contractRepository;
	private final FollowRepository followRepository;
	private final AuthUtil authUtil;
	private final S3FileUtil fileUtil;

	/**
	 * 동물 등록
	 */
	@Transactional
	@Override
	public void registAnimal(AnimalRegistRequestDto animalRegistRequestDto, MultipartFile imageFile) throws Exception {
		if (animalRegistRequestDto.getName() == null || animalRegistRequestDto.getSpecies() == null ||
		animalRegistRequestDto.getKindCd() == null || animalRegistRequestDto.getColorCd() == null ||
		animalRegistRequestDto.getAge() == null || animalRegistRequestDto.getWeight() == null ||
				animalRegistRequestDto.getSexCd() == null || animalRegistRequestDto.getNeuterYn() == null ||
				animalRegistRequestDto.getCareAddr() == null || imageFile == null) {
			throw new PetBridgeException(ErrorCode.BAD_REQUEST);
		}

		User user = authUtil.getAuthenticatedUser();

		// 등록 진행
		String savedImageFileName = fileUtil.saveFile(imageFile, "images");
		Animal entity = animalRegistRequestDto.toEntity(user.getId(), savedImageFileName);

		animalRepository.save(entity);
	}

	/**
	 * 내 동물 수정
	 */
	@Transactional
	@Override
	public void editAnimal(int id, AnimalEditRequestDto animalEditRequestDto, MultipartFile imageFile) throws Exception {
		if (animalEditRequestDto.getName() == null || animalEditRequestDto.getSpecies() == null ||
				animalEditRequestDto.getKindCd() == null || animalEditRequestDto.getColorCd() == null ||
				animalEditRequestDto.getAge() == null || animalEditRequestDto.getWeight() == null ||
				animalEditRequestDto.getSexCd() == null || animalEditRequestDto.getNeuterYn() == null ||
				animalEditRequestDto.getCareAddr() == null || imageFile == null) {
			throw new PetBridgeException(ErrorCode.BAD_REQUEST);
		}

		User user = authUtil.getAuthenticatedUser();

		// 없거나 삭제된 동물
		Animal entity = animalRepository.findByIdAndDisabledFalse(id)
			.orElseThrow(() -> new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND));
		// 내 동물 아닐때
		if (user.getId() != entity.getUserId()) {
			throw new PetBridgeException(ErrorCode.FORBIDDEN);
		}

		// 수정 진행
		String savedImageFileName = fileUtil.saveFile(imageFile, "images");
		entity.update(animalEditRequestDto, savedImageFileName);
		
		animalRepository.save(entity);
	}

	/**
	 * 내 동물 삭제
	 */
	@Transactional
	@Override
	public void removeAnimal(int id) throws Exception {
		User user = authUtil.getAuthenticatedUser();

		// 없거나 삭제된 동물
		Animal entity = animalRepository.findByIdAndDisabledFalse(id)
			.orElseThrow(() -> new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND));
		// 내 동물 아닐때
		if (user.getId() != entity.getUserId()) {
			throw new PetBridgeException(ErrorCode.FORBIDDEN);
		}

		// 삭제
		entity.disable();

		animalRepository.save(entity);
	}

	/**
	 * 동물 목록 조회 (카테고리, 검색, 페이징)
	 */
	@Override
	public Page<AnimalResponseDto> getListAnimal(int page, int size, String species,
												 String kindCd, String careAddr, String processState) throws Exception {
		Sort sort = Sort.by(Sort.Direction.DESC, "id");
		Pageable pageable = PageRequest.of(page, size, sort);

		// processState에 따라 contract 테이블로부터 동물 id 필터링
		List<Integer> filteredAnimalIds = filterByProcessState(processState);

		// 동적 쿼리 적용
		Page<Animal> pagedAnimals = animalRepository.findAnimalsByDynamicQuery(page, size, species, kindCd, careAddr, filteredAnimalIds, pageable);

		List<AnimalResponseDto> animalResponseDtos = pagedAnimals.stream()
				.map(animal -> {
					try {
						User animalUser = userRepository.findByIdAndDisabledFalse(animal.getUserId())
								.orElseThrow(() -> new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND));
						return new AnimalResponseDto(animal, determineProcessState(animal), boardService.getListBoardByAnimalId(page, size, animal.getId()), animalUser);
					} catch (Exception e) {
						throw new RuntimeException(e);
					}
				})
				.collect(Collectors.toList());

		return new PageImpl<>(animalResponseDtos, pageable, pagedAnimals.getTotalElements());
	}

	/**
	 * 내가 보호중인 동물 목록 조회
	 */
	@Override
	public List<AnimalResponseDto> getListMyAnimal(int page, int size) throws Exception {
		User user = authUtil.getAuthenticatedUser();

		Sort sort = Sort.by(Sort.Direction.DESC, "id");
		Pageable pageable = PageRequest.of(page, size, sort);
		Page<Animal> animals = animalRepository.findByUserIdAndDisabledFalse(user.getId(), pageable);

		return animals.stream()
			.map(animal -> {
                try {
					User animalUser = userRepository.findByIdAndDisabledFalse(animal.getUserId())
							.orElseThrow(() -> new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND));
                    return new AnimalResponseDto(animal, determineProcessState(animal), boardService.getListBoardByAnimalId(page, size, animal.getId()), animalUser);
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            })
			.collect(Collectors.toList());
	}

	/**
	 * 특정 유저가(닉네임) 보호중인 동물 목록 조회
	 */
	@Override
	public List<AnimalResponseDto> getListUserAnimal(String userNickname, int page, int size) throws Exception {

		User user = userRepository.findByNickname(userNickname)
				.orElseThrow(() -> new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND));

		Sort sort = Sort.by(Sort.Direction.DESC, "id");
		Pageable pageable = PageRequest.of(page, size, sort);
		Page<Animal> animals = animalRepository.findByUserIdAndDisabledFalse(user.getId(), pageable);

		return animals.stream()
				.map(animal -> {
                    try {
						User animalUser = userRepository.findByIdAndDisabledFalse(animal.getUserId())
								.orElseThrow(() -> new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND));
                        return new AnimalResponseDto(animal, determineProcessState(animal), boardService.getListBoardByAnimalId(page, size, animal.getId()), animalUser);
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }
                })
				.collect(Collectors.toList());
	}

	/**
	 * 내가 팔로우 중인 동물 목록 조회
	 */
	@Override
	public List<AnimalResponseDto> getListFollowAnimal(int page, int size) throws Exception {
		User user = authUtil.getAuthenticatedUser();

		// FollowRepository로부터 팔로우한 동물 목록 가져오기
		List<Animal> animals = followRepository.findFollowedAnimalsByUserId(user.getId());

		// 페이징 처리
		Sort sort = Sort.by(Sort.Direction.DESC, "id");
		Pageable pageable = PageRequest.of(page, size, sort);
		int start = (int)pageable.getOffset();
		int end = Math.min((start + pageable.getPageSize()), animals.size());
		if (start > end) {
			throw new IllegalArgumentException("Invalid page request");
		}
		Page<Animal> pagedAnimals = new PageImpl<>(animals.subList(start, end), pageable, animals.size());

		// AnimalResponseDto로 변환 및 반환
		return pagedAnimals.stream()
			.map(animal -> {
                try {
					User animalUser = userRepository.findByIdAndDisabledFalse(animal.getUserId())
							.orElseThrow(() -> new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND));
                    return new AnimalResponseDto(animal, determineProcessState(animal), boardService.getListBoardByAnimalId(page, size, animal.getId()), animalUser);
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            })
			.collect(Collectors.toList());
	}

	/**
	 * 동물 상세 조회
	 */
	@Override
	public AnimalResponseDto getDetailAnimal(int id, int page, int size) throws Exception {
		Animal animal = animalRepository.findByIdAndDisabledFalse(id)
			.orElseThrow(() -> new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND));
		User animalUser = userRepository.findByIdAndDisabledFalse(animal.getUserId())
				.orElseThrow(() -> new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND));

		return new AnimalResponseDto(animal, determineProcessState(animal), boardService.getListBoardByAnimalId(page, size, animal.getId()), animalUser);
	}

	private List<Integer> filterByProcessState(String processState) {
		List<Integer> animalIds = new ArrayList<>();

		List<Integer> waitingAnimalIds = contractRepository.findByStatus("계약전").stream()
				.map(Contract::getAnimalId)
				.collect(Collectors.toList());
		List<Integer> confirmedAnimalIds = contractRepository.findByStatusNot("계약전").stream()
				.map(Contract::getAnimalId)
				.collect(Collectors.toList());

		switch (processState) {
			case "입양대기" :
				animalIds = waitingAnimalIds;
				break;
			case "입양완료" :
				animalIds = confirmedAnimalIds;
				break;
			case "임시보호" :
				animalIds = animalRepository.findAll().stream()
						.map(Animal::getId)
						.filter(id -> !waitingAnimalIds.contains(id) && !confirmedAnimalIds.contains(id))
						.collect(Collectors.toList());
				break;
			default :
				animalIds = animalRepository.findAll().stream()
						.map(Animal::getId)
						.collect(Collectors.toList());
		}

		return animalIds;
	}

	private String determineProcessState(Animal animal) {
		if (contractRepository.existsByAnimalIdAndStatusNot(animal.getId(), "계약전")) {
			return "입양완료";
		} else if (contractRepository.existsByAnimalIdInContract(animal.getId())) {
			return "입양대기";
		} else {
			return "임시보호";
		}
	}
}
