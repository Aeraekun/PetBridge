package site.petbridge.domain.animal.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import site.petbridge.domain.animal.domain.Animal;
import site.petbridge.domain.animal.dto.request.AnimalEditRequestDto;
import site.petbridge.domain.animal.dto.request.AnimalRegistRequestDto;
import site.petbridge.domain.animal.dto.response.AnimalResponseDto;
import site.petbridge.domain.animal.repository.AnimalRepository;
import site.petbridge.domain.contract.domain.Contract;
import site.petbridge.domain.contract.repository.ContractRepository;
import site.petbridge.domain.follow.repository.FollowRepository;
import site.petbridge.domain.user.domain.User;
import site.petbridge.domain.user.repository.UserRepository;
import site.petbridge.global.exception.ErrorCode;
import site.petbridge.global.exception.PetBridgeException;
import site.petbridge.global.login.userdetail.CustomUserDetail;
import site.petbridge.util.FileUtil;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnimalServiceImpl implements AnimalService {

	private final AnimalRepository animalRepository;
	private final UserRepository userRepository;
	private final FileUtil fileUtil;
	private final ContractRepository contractRepository;
	private final FollowRepository followRepository;

	/**
	 * 동물 등록
	 */
	@Transactional
	@Override
	public void registAnimal(AnimalRegistRequestDto animalRegistRequestDto, MultipartFile imageFile) throws Exception {
		// 회원 정보
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		int userId = ((CustomUserDetail) authentication.getPrincipal()).getId();
		User user = userRepository.findById((long) userId).get();

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
	public void editAnimal(int id, AnimalEditRequestDto animalEditRequestDto, MultipartFile imageFile) throws Exception {
		// 회원 정보
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		int userId = ((CustomUserDetail) authentication.getPrincipal()).getId();
		User user = userRepository.findById((long) userId).get();

		// 없거나 삭제된 동물
		Animal entity = animalRepository.findByIdAndDisabledFalse(id)
				.orElseThrow(() -> new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND));
		
		// 내 동물 아닐때
		if (userId != entity.getUserId()) {
			throw new PetBridgeException(ErrorCode.FORBIDDEN);
		}

		String savedImageFileName = null;
		if (imageFile != null) {
			savedImageFileName = fileUtil.saveFile(imageFile, "animals");
		}

		entity.update(animalEditRequestDto.getName(), savedImageFileName, animalEditRequestDto.getSpecies(), animalEditRequestDto.getKindCd(),
				animalEditRequestDto.getColorCd(), animalEditRequestDto.getAge(), animalEditRequestDto.getWeight(), animalEditRequestDto.getSexCd(),
				animalEditRequestDto.getNeuterYn(), animalEditRequestDto.getSpecialMark(), animalEditRequestDto.getCareAddr());
		animalRepository.save(entity);
	}

	/**
	 * 내 동물 삭제
	 */
	@Transactional
	@Override
	public void removeAnimal(int id) throws Exception {
		// 회원 정보
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		int userId = ((CustomUserDetail) authentication.getPrincipal()).getId();
		User user = userRepository.findById((long) userId).get();

		// 없거나 삭제된 동물
		Animal entity = animalRepository.findByIdAndDisabledFalse(id)
				.orElseThrow(() -> new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND));

		// 내 동물 아닐때
		if (userId != entity.getUserId()) {
			throw new PetBridgeException(ErrorCode.FORBIDDEN);
		}

		entity.disable();
		animalRepository.save(entity);
	}

	/**
	 * 동물 목록 조회 (카테고리, 검색, 페이징)
	 */
	@Override
	public List<AnimalResponseDto> getListAnimal(int page, int size, String species, String careAddr, String processState) throws Exception {
		Sort sort = Sort.by(Sort.Direction.DESC, "id");
		Pageable pageable = PageRequest.of(page, size, sort);

		// processState에 따라 contract 테이블로부터 동물 id 필터링
		List<Integer> filteredAnimalIds = filterByProcessState(processState);
		
		// animal 테이블에서 species와 careAddr에 따른 검색 (No 페이징)
		Page<Animal> animals;
		if (species != null && careAddr != null) {
			animals = animalRepository.findBySpeciesAndCareAddrContainingAndDisabledFalse(species, careAddr, Pageable.unpaged());
		} else if (species != null) {
			animals = animalRepository.findBySpeciesAndDisabledFalse(species, Pageable.unpaged());
		} else if (careAddr != null) {
			animals = animalRepository.findByCareAddrContainingAndDisabledFalse(careAddr, Pageable.unpaged());
		} else {
			animals = animalRepository.findAll(Pageable.unpaged());
		}

		// 동물 id processState 필터링 적용
		List<Animal> filteredAnimals = animals.stream()
				.filter(animal -> filteredAnimalIds.contains(animal.getId()))
				.sorted((a1, a2) -> Integer.compare(a2.getId(), a1.getId())) // 큰 id부터 나오게
				.collect(Collectors.toList());
		
		// 최종 paging 처리
		int start = (int) pageable.getOffset();
		int end = Math.min((start + pageable.getPageSize()), filteredAnimals.size());
		Page<Animal> pagedAnimals = new PageImpl<>(filteredAnimals.subList(start, end), pageable, filteredAnimals.size());

		return pagedAnimals.stream()
				.map(animal -> new AnimalResponseDto(animal, determineProcessState(animal)))
				.collect(Collectors.toList());
	}

	/**
	 * 내가 보호중인 동물 목록 조회
	 */
	@Override
	public List<AnimalResponseDto> getListMyAnimal(int page, int size) throws Exception {
		// 회원 정보
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		int userId = ((CustomUserDetail) authentication.getPrincipal()).getId();
		User user = userRepository.findById((long) userId).get();

		Sort sort = Sort.by(Sort.Direction.DESC, "id");
		Pageable pageable = PageRequest.of(page, size, sort);

		Page<Animal> animals = animalRepository.findByUserIdAndDisabledFalse(userId, pageable);

		return animals.stream()
				.map(animal -> new AnimalResponseDto(animal, determineProcessState(animal)))
				.collect(Collectors.toList());
	}

	/**
	 * 내가 팔로우 중인 동물 목록 조회
	 */
	@Override
	public List<AnimalResponseDto> getListFollowAnimal(int page, int size) throws Exception {
		// 회원 정보
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		int userId = ((CustomUserDetail) authentication.getPrincipal()).getId();
		User user = userRepository.findById((long) userId).get();

		// FollowRepository로부터 팔로우한 동물 목록 가져오기
		List<Animal> animals = followRepository.findFollowedAnimalsByUserId(userId);

		// 페이징 처리
		Sort sort = Sort.by(Sort.Direction.DESC, "id");
		Pageable pageable = PageRequest.of(page, size, sort);
		int start = (int) pageable.getOffset();
		int end = Math.min((start + pageable.getPageSize()), animals.size());
		Page<Animal> pagedAnimals = new PageImpl<>(animals.subList(start, end), pageable, animals.size());

		// AnimalResponseDto로 변환 및 반환
		return pagedAnimals.stream()
				.map(animal -> new AnimalResponseDto(animal, determineProcessState(animal)))
				.collect(Collectors.toList());
	}

	/**
	 * 동물 상세 조회
	 */
	@Override
	public AnimalResponseDto getDetailAnimal(int id) throws Exception {
		Animal animal = animalRepository.findByIdAndDisabledFalse(id)
				.orElseThrow(() -> new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND));

		return new AnimalResponseDto(animal, determineProcessState(animal));
	}

	private List<Integer> filterByProcessState(String processState) {
		List<Integer> animalIds;
		switch (processState) {
			case "입양대기" :
				animalIds = contractRepository.findAllByConfirmedFalse().stream()
						.map(Contract::getAnimalId)
						.collect(Collectors.toList());
			case "입양완료" :
				animalIds = contractRepository.findAllByConfirmedTrue().stream()
						.map(Contract::getAnimalId)
						.collect(Collectors.toList());
			case "임시보호" :
				List<Integer> waitingAnimalIds = contractRepository.findAllByConfirmedFalse().stream().map(Contract::getAnimalId).collect(Collectors.toList());
				List<Integer> confirmedAnimalIds = contractRepository.findAllByConfirmedTrue().stream().map(Contract::getAnimalId).collect(Collectors.toList());
				animalIds = animalRepository.findAll().stream()
						.map(Animal::getId)
						.filter(id -> !confirmedAnimalIds.contains(id) && !waitingAnimalIds.contains(id))
						.collect(Collectors.toList());
			default:
				animalIds = animalRepository.findAll().stream()
						.map(Animal::getId)
						.collect(Collectors.toList());
				break;
		}

		return animalIds;
	}

	private String determineProcessState(Animal animal) {
		if (contractRepository.existsByAnimalIdAndConfirmedTrue(animal.getId())) {
			return "입양완료";
		} else if (contractRepository.existsByAnimalIdAndConfirmedFalse(animal.getId())) {
			return "입양대기";
		} else {
			return "임시보호";
		}
	}
}
