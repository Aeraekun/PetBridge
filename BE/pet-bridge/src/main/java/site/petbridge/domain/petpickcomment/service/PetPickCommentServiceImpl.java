package site.petbridge.domain.petpickcomment.service;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import site.petbridge.domain.petpick.domain.PetPick;
import site.petbridge.domain.petpick.dto.request.PetPickEditRequestDto;
import site.petbridge.domain.petpick.dto.request.PetPickRegistRequestDto;
import site.petbridge.domain.petpick.dto.response.PetPickResponseDto;
import site.petbridge.domain.petpickcomment.dto.request.PetPickCommentEditRequestDto;
import site.petbridge.domain.petpickcomment.dto.request.PetPickCommentRegistRequestDto;
import site.petbridge.domain.petpickcomment.dto.response.PetPickCommentResponseDto;
import site.petbridge.domain.petpickcomment.repository.PetPickCommentRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PetPickCommentServiceImpl implements PetPickCommentService {

    private final PetPickCommentRepository petPickCommentRepository;


    /**
     * 펫픽 목록 조회
     */
//    @Override
//    public List<PetPickResponseDto> findAll() {
//
//        Sort sort = Sort.by(Sort.Direction.DESC, "id", "registTime");
//        List<PetPick> list = petPickRepository.findAll(sort);
//        return list.stream().map(PetPickResponseDto::new).collect(Collectors.toList());
//    }

//    @Override
//    public int save(HttpServletRequest httpServletRequest, PetPickCommentRegistRequestDto petPickCommentRegistRequestDto) throws Exception {
//        return 0;
//    }
//
//    @Override
//    public List<PetPickCommentResponseDto> findByPetPickId(Long id) throws Exception {
//        return List.of();
//    }
//
//    @Override
//    public Long update(HttpServletRequest httpServletRequest, PetPickCommentEditRequestDto petPickCommentEditRequestDto, Long petPickCommentId) throws Exception {
//        return 0;
//    }
//
//    @Override
//    public Long delete(HttpServletRequest httpServletRequest, Long id) throws Exception {
//        return 0;
//    }
}
