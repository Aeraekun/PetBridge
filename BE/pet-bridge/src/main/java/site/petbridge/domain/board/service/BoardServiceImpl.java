package site.petbridge.domain.board.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import site.petbridge.domain.board.domain.Board;
import site.petbridge.domain.board.domain.enums.BoardType;
import site.petbridge.domain.board.dto.request.BoardRegistRequestDto;
import site.petbridge.domain.board.dto.request.BoardEditRequestDto;
import site.petbridge.domain.board.dto.response.BoardResponseDto;
import site.petbridge.domain.board.repository.BoardRepository;
import site.petbridge.util.FileUtil;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

	private final BoardRepository boardRepository;
	private final FileUtil fileUtil;

	@Override
	public void registBoard(BoardRegistRequestDto boardRegistRequestDto, MultipartFile file) throws Exception {

		String thumbnail = null;

		if (file != null) {
			String savedFileName = fileUtil.saveFile(file, "board");
			if (savedFileName != null) {
				thumbnail = savedFileName;
			}
		}
		Board board = Board.builder()
			.userId(boardRegistRequestDto.getUserId())
			.animalId(boardRegistRequestDto.getAnimalId())
			.type(BoardType.valueOf(boardRegistRequestDto.getType()))
			.thumbnail(thumbnail)
			.title(boardRegistRequestDto.getTitle())
			.content(boardRegistRequestDto.getContent())
			.lat(boardRegistRequestDto.getLat())
			.lon(boardRegistRequestDto.getLon())
			.build();

		boardRepository.save(board);
	}

	@Override
	public int editBoard(int id, BoardEditRequestDto boardEditRequestDto, MultipartFile file) throws Exception {
		String thumbnail = boardEditRequestDto.getThumbnail();

		if (boardEditRequestDto.getThumbnailRemoved() && thumbnail != null) {
			fileUtil.removeFile("board", boardEditRequestDto.getThumbnail());
			thumbnail = null;
		}

		if (file != null) {
			String savedFileName = fileUtil.saveFile(file, "board");
			if (savedFileName != null) {
				thumbnail = savedFileName;
			}
		}
		Board board = boardRepository.findById(id).orElse(null);

		if (board != null) {
			board.setAnimalId(boardEditRequestDto.getAnimalId());
			board.setThumbnail(thumbnail);
			board.setTitle(boardEditRequestDto.getTitle());
			board.setContent(boardEditRequestDto.getContent());
			board.setLat(boardEditRequestDto.getLat());
			board.setLon(boardEditRequestDto.getLon());
			boardRepository.save(board);
			return 1;
		}
		return 0;

	}

	@Override
	public Optional<List<BoardResponseDto>> getListBoard() {
		return Optional.ofNullable(boardRepository.findAllBoardResponseDtos());
	}

	@Override
	public Optional<BoardResponseDto> getDetailBoard(int id) {
		return Optional.ofNullable(boardRepository.findBoardResponseDtoById(id));
	}

	@Override
	public int removeBoard(int boardId) {
		Board board = boardRepository.findById(boardId).orElse(null);
		if (board != null) {
			board.setDisabled(true);
			boardRepository.save(board);
			return 1;
		}
		return 0;
	}

}
