package site.petbridge.domain.user.service;

import jakarta.servlet.http.HttpServletRequest;
import site.petbridge.domain.user.dto.request.UserSignUpRequestDto;
import site.petbridge.domain.user.dto.response.UserResponseDto;

import java.util.Optional;

public interface UserService {

    /**
     * Optional<List<BoardResponseDto>> getListBoard();
     *     Optional<BoardResponseDto> getDetailBoard(int id);
     *     void registBoard(BoardAddRequestDto boardAddRequestDto, MultipartFile file) throws Exception;
     *     int editBoard(int id, BoardEditRequestDto boardEditRequestDto, MultipartFile file) throws Exception;
     *     int removeBoard(int boardId);
     */

    Optional<UserResponseDto> registUser(UserSignUpRequestDto userSignUpRequestDto) throws Exception;
    Optional<UserResponseDto> getDetailMyUser(HttpServletRequest httpServletRequest) throws Exception;
}
