package site.petbridge.domain.animal.service;

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

@Service
@RequiredArgsConstructor
public class AnimalServiceImpl implements AnimalService {

	private final BoardService boardService;
	private final AnimalRepository animalRepository;
	private final UserRepository userRepository;
	private final ContractRepository contractRepository;
	private final FollowRepository followRepository;
	private final AuthUtil authUtil;
	private final FileUtil fileUtil;

	/**
	 * 동물 등록
	 */
	@Transactional
	@Override
	public void registAnimal(AnimalRegistRequestDto animalRegistRequestDto, MultipartFile imageFile) throws Exception {
		User user = authUtil.getAuthenticatedUser();

		String savedImageFileName = null;
		if (imageFile != null) {
			savedImageFileName = fileUtil.saveFile(imageFile, "animals");
		}

		Animal entity = animalRegistRequestDto.toEntity(user.getId(), savedImageFileName);
		animalRepository.save(entity);
	}

	/**
	 * 내 동물 수정
	 */
	@Transactional
	@Override
	public void editAnimal(int id, AnimalEditRequestDto animalEditRequestDto, MultipartFile imageFile) throws
		Exception {
		User user = authUtil.getAuthenticatedUser();

		// 없거나 삭제된 동물
		Animal entity = animalRepository.findByIdAndDisabledFalse(id)
			.orElseThrow(() -> new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND));

		// 내 동물 아닐때
		if (user.getId() != entity.getUserId()) {
			throw new PetBridgeException(ErrorCode.FORBIDDEN);
		}

		String savedImageFileName = null;
		if (imageFile != null) {
			savedImageFileName = fileUtil.saveFile(imageFile, "animals");
		}

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

		entity.disable();
		animalRepository.save(entity);
	}

	/**
	 * 동물 목록 조회 (카테고리, 검색, 페이징)
	 */
	@Override
	public Page<AnimalResponseDto> getListAnimal(int page, int size, String species, String careAddr,
		String processState) throws Exception {
		Sort sort = Sort.by(Sort.Direction.DESC, "id");
		Pageable pageable = PageRequest.of(page, size, sort);

		// processState에 따라 contract 테이블로부터 동물 id 필터링
		List<Integer> filteredAnimalIds = filterByProcessState(processState);
		System.out.println(filteredAnimalIds);

		// animal 테이블에서 species와 careAddr에 따른 검색 (No 페이징)
		Page<Animal> animals;
		if (species != null && careAddr != null) {
			animals = animalRepository.findBySpeciesAndCareAddrContainingAndDisabledFalse(species, careAddr,
				Pageable.unpaged());
		} else if (species != null) {
			animals = animalRepository.findBySpeciesAndDisabledFalse(species, Pageable.unpaged());
		} else if (careAddr != null) {
			animals = animalRepository.findByCareAddrContainingAndDisabledFalse(careAddr, Pageable.unpaged());
		} else {
			animals = animalRepository.findAllByDisabledFalse(Pageable.unpaged());
		}

		// 동물 id processState 필터링 적용
		List<Animal> filteredAnimals = animals.stream()
			.filter(animal -> filteredAnimalIds.contains(animal.getId()))
			.sorted((a1, a2) -> Integer.compare(a2.getId(), a1.getId())) // 큰 id부터 나오게
			.collect(Collectors.toList());

		// 최종 paging 처리
		int start = (int) pageable.getOffset();
		int end = Math.min((start + pageable.getPageSize()), filteredAnimals.size());
		if (start > end) {
			throw new IllegalArgumentException("Invalid page request");
		}
		Page<Animal> pagedAnimals = new PageImpl<>(filteredAnimals.subList(start, end), pageable,
			filteredAnimals.size());

		List<AnimalResponseDto> animalResponseDtos =  pagedAnimals.stream()
			.map(animal -> {
                try {
                    return new AnimalResponseDto(animal, determineProcessState(animal), boardService.getListBoardByAnimalId(page, size, animal.getId()));
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            })
			.collect(Collectors.toList());

		return new PageImpl<>(animalResponseDtos, pageable, filteredAnimals.size());
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
                    return new AnimalResponseDto(animal, determineProcessState(animal), boardService.getListBoardByAnimalId(page, size, animal.getId()));
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
                        return new AnimalResponseDto(animal, determineProcessState(animal), boardService.getListBoardByAnimalId(page, size, animal.getId()));
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
                    return new AnimalResponseDto(animal, determineProcessState(animal), boardService.getListBoardByAnimalId(page, size, animal.getId()));
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

		return new AnimalResponseDto(animal, determineProcessState(animal), boardService.getListBoardByAnimalId(page, size, animal.getId()));
	}

	private List<Integer> filterByProcessState(String processState) {
		List<Integer> animalIds;
		switch (processState) {
			case "입양대기":
				System.out.println("입양대기 들어음");
				animalIds = contractRepository.findAllByStatus("계약전").stream()
					.map(Contract::getAnimalId)
					.collect(Collectors.toList());
				break;
			case "입양완료":
				System.out.println("입양완료 들어옴");
				animalIds = contractRepository.findAllByStatusNot("계약전").stream()
					.map(Contract::getAnimalId)
					.collect(Collectors.toList());
				break;
			case "임시보호":
				List<Integer> waitingAnimalIds = contractRepository.findAllByStatus("계약전")
					.stream()
					.map(Contract::getAnimalId)
					.collect(Collectors.toList());
				List<Integer> confirmedAnimalIds = contractRepository.findAllByStatusNot("계약전")
					.stream()
					.map(Contract::getAnimalId)
					.collect(Collectors.toList());
				animalIds = animalRepository.findAll().stream()
					.map(Animal::getId)
					.filter(id -> !confirmedAnimalIds.contains(id) && !waitingAnimalIds.contains(id))
					.collect(Collectors.toList());
				break;
			default:
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
