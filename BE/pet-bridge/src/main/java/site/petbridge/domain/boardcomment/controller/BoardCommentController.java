package site.petbridge.domain.boardcomment.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import site.petbridge.domain.boardcomment.dto.request.BoardCommentRequestDto;
import site.petbridge.domain.boardcomment.dto.response.BoardCommentResponseDto;
import site.petbridge.domain.boardcomment.service.BoardCommentService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board-comments")
public class BoardCommentController {

    private final BoardCommentService boardCommentService;

    @GetMapping("/{boardId}")
    public ResponseEntity<List<BoardCommentResponseDto>> getListBoardComment(@PathVariable("boardId") int boardId) throws Exception {
        return boardCommentService.getListBoardComment(boardId)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.status(HttpStatus.NO_CONTENT).build());
    }

    @PostMapping
    public ResponseEntity<Void> registBoardComment (
    @RequestBody BoardCommentRequestDto boardCommentRequestDto) throws Exception{
        boardCommentService.registBoardComment(boardCommentRequestDto);
        return ResponseEntity.status((HttpStatus.CREATED)).build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Void> editBoardComment (
        @PathVariable("id") int id,
        @RequestBody BoardCommentRequestDto boardCommentRequestDto) throws Exception{

        if(boardCommentService.editBoardComment(id, boardCommentRequestDto) == 0){
            ResponseEntity.status((HttpStatus.BAD_REQUEST)).build();
        }
        return ResponseEntity.status((HttpStatus.OK)).build();
    }

    @PatchMapping("/{id}/disable")
    public ResponseEntity<Void> removeBoardComment(@PathVariable("id") int id) throws Exception {
        boardCommentService.removeBoardComment(id);
        return ResponseEntity.noContent().build();
    }




}



