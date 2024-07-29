package site.petbridge.domain.board.repository;

import java.util.List;

import site.petbridge.domain.board.dto.response.BoardResponseDto;

public interface BoardCustomRepository {
	List<BoardResponseDto> findAllBoardResponseDtos();

	BoardResponseDto findBoardResponseDtoById(int id);
}