package site.petbridge.domain.board.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import site.petbridge.domain.board.domain.Board;
import site.petbridge.domain.board.domain.enums.BoardType;
import site.petbridge.domain.board.dto.request.BoardAddRequestDto;
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
	public void registBoard(BoardAddRequestDto boardAddRequestDto, MultipartFile file) throws Exception {

		String thumbnail = null;

		if (file != null) {
			System.out.println("파일등록할게");
			// String today = new SimpleDateFormat("yyMMdd").format(new Date());
			String savedFileName = fileUtil.saveFile(file, "board");
			if (savedFileName != null) {
				thumbnail = savedFileName;
				System.out.println("저장파일명: " + thumbnail);
			}
		}
		System.out.println("이제 db에 저장할게");
		Board transferToBoard = Board.builder()
			.userId(boardAddRequestDto.getUserId())
			.animalId(boardAddRequestDto.getAnimalId())
			.type(BoardType.valueOf(boardAddRequestDto.getType()))
			.thumbnail(thumbnail)
			.title(boardAddRequestDto.getTitle())
			.content(boardAddRequestDto.getContent())
			.lat(boardAddRequestDto.getLat())
			.lon(boardAddRequestDto.getLon())

			.build();

		boardRepository.save(transferToBoard);
		System.out.println("DB저장완료");
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
