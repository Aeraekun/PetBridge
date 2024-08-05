package site.petbridge.domain.boardcomment.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.petbridge.domain.board.service.BoardService;
import site.petbridge.domain.boardcomment.dto.request.BoardCommentEditRequestDto;
import site.petbridge.domain.boardcomment.dto.request.BoardCommentRegistRequestDto;
import site.petbridge.domain.boardcomment.dto.response.BoardCommentResponseDto;
import site.petbridge.domain.boardcomment.service.BoardCommentService;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board-comments")
public class BoardCommentController {

    private final BoardCommentService boardCommentService;

    /**
     * 게시글 댓글 등록
     */
    @PostMapping
    public ResponseEntity<Void> registBoardComment(
            @RequestBody BoardCommentRegistRequestDto boardCommentRegistRequestDto) throws Exception {
        boardCommentService.registBoardComment(boardCommentRegistRequestDto);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    /**
     * 게시글 ID 기반 게시글 댓글 목록 조회
     */
    @GetMapping("/{board_id}")
    public ResponseEntity<List<BoardCommentResponseDto>> getListBoardComment(@PathVariable("board_id") int boardId,
                                                                             @RequestParam(defaultValue = "0") int page,
                                                                             @RequestParam(defaultValue = "12") int size) throws Exception {
        List<BoardCommentResponseDto> boardCommentResponseDtos = boardCommentService.getListBoardComment(boardId, page, size);

        return Optional.ofNullable(boardCommentResponseDtos)
                .filter(list -> !list.isEmpty())
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.noContent().build());
    }

    /**
     * 게시글 댓글 수정
     *
     */
    @PatchMapping("/{id}")
    public ResponseEntity<Void> modifyBoardComment(@PathVariable("id") int id,
                                                   @Valid @RequestBody BoardCommentEditRequestDto boardCommentEditRequestDto) throws Exception {
        boardCommentService.editBoardComment(id, boardCommentEditRequestDto);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /**
     * 게시글 댓글 삭제
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeBoardComment(@PathVariable("id") int id) throws Exception {
        boardCommentService.removeBoardComment(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
