package site.petbridge.domain.board.controller;

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
import site.petbridge.domain.board.dto.request.BoardRegistRequestDto;
import site.petbridge.domain.board.dto.request.BoardEditRequestDto;
import site.petbridge.domain.board.dto.response.BoardResponseDto;
import site.petbridge.domain.board.service.BoardService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/boards")
public class BoardController {

	private final BoardService boardService;

	@GetMapping
	public ResponseEntity<List<BoardResponseDto>> getListBoard() {
		System.out.println("getListBoard");
		return boardService.getListBoard()
			.map(ResponseEntity::ok)
			.orElseGet(() -> ResponseEntity.status(HttpStatus.NO_CONTENT).build());
	}

	@GetMapping("/{id}")
	public ResponseEntity<BoardResponseDto> getDetailBoard(@PathVariable("id") int id) {
		return boardService.getDetailBoard(id)
			.map(ResponseEntity::ok)
			.orElseGet(() -> ResponseEntity.status(HttpStatus.NO_CONTENT).build());
	}

	@PostMapping
	public ResponseEntity<Void> registBoard(
		@RequestPart(name = "boardRegistRequestDto") BoardRegistRequestDto boardRegistRequestDto,
		@RequestPart(name = "file", required = false) MultipartFile file) throws Exception {
		boardService.registBoard(boardRegistRequestDto, file);
		return ResponseEntity.status((HttpStatus.CREATED)).build();
	}

	@PatchMapping("/{id}")
	public ResponseEntity<Void> editBoard(
		@PathVariable("id") int id,
		@RequestPart(name = "boardEditRequestDto") BoardEditRequestDto boardEditRequestDto,
		@RequestPart(name = "file", required = false) MultipartFile file) throws Exception {
		if (boardService.editBoard(id, boardEditRequestDto, file) == 0) {
			ResponseEntity.status((HttpStatus.BAD_REQUEST)).build();
		}
		return ResponseEntity.status((HttpStatus.OK)).build();
	}

	@PatchMapping("/{id}/disable")
	public ResponseEntity<Void> removeBoard(@PathVariable("id") int boardId) {
		if (boardService.removeBoard(boardId) == 1) {
			return ResponseEntity.status((HttpStatus.NO_CONTENT)).build();
		}
		return ResponseEntity.status((HttpStatus.BAD_REQUEST)).build();

	}

}



