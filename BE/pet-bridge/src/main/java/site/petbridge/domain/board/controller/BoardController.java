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
import site.petbridge.domain.board.dto.request.BoardAddRequestDto;
import site.petbridge.domain.board.dto.request.BoardEditRequestDto;
import site.petbridge.domain.board.dto.response.BoardResponseDto;
import site.petbridge.domain.board.service.BoardService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/boards")
public class BoardController {

    private final BoardService boardService;

    @GetMapping
    public ResponseEntity<List<BoardResponseDto>> getListBoard() throws Exception {
        System.out.println("getListBoard");
        return boardService.getListBoard()
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.status(HttpStatus.NO_CONTENT).build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BoardResponseDto> getDetailBoard(@PathVariable("id") int id) throws Exception {
        return boardService.getDetailBoard(id)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.status(HttpStatus.NO_CONTENT).build());
    }

    @PostMapping
    public ResponseEntity<Void> registBoard (
    @RequestPart(name = "boardAddRequestDto") BoardAddRequestDto boardAddRequestDto,
    @RequestPart(name = "file", required = false) MultipartFile file) throws Exception{
        System.out.println("컨트롤러 요청 들어옴");
        boardService.registBoard(boardAddRequestDto, file);
        System.out.println("컨트롤러 요청 처리 완료. 클라이언트 전송");
        return ResponseEntity.status((HttpStatus.CREATED)).build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Void> editBoard (
        @PathVariable("id") int id,
        @RequestPart(name = "boardEditRequestDto") BoardEditRequestDto boardEditRequestDto,
        @RequestPart(name = "file", required = false) MultipartFile file) throws Exception{
        if(boardService.editBoard(id, boardEditRequestDto, file) == 0){
            ResponseEntity.status((HttpStatus.BAD_REQUEST)).build();
        }
        return ResponseEntity.status((HttpStatus.OK)).build();
    }

    @PatchMapping("/{id}/disable")
    public ResponseEntity<Void> removeBoard(@PathVariable("id") int boardId) throws Exception {
        try {
            boardService.removeBoard(boardId);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return ResponseEntity.noContent().build();

    }




}



