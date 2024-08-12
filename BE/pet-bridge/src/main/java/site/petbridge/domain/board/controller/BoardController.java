package site.petbridge.domain.board.controller;

import jakarta.validation.Valid;
import kotlinx.serialization.Required;
import lombok.RequiredArgsConstructor;
import okhttp3.Response;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import site.petbridge.domain.board.domain.enums.BoardType;
import site.petbridge.domain.board.dto.request.BoardEditRequestDto;
import site.petbridge.domain.board.dto.request.BoardRegistRequestDto;
import site.petbridge.domain.board.dto.response.BoardResponseDto;
import site.petbridge.domain.board.service.BoardService;
import site.petbridge.domain.user.dto.response.UserResponseDto;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/boards")
public class BoardController {

    private final BoardService boardService;

    /**
     * 게시글 등록
     */
    @PostMapping
    public ResponseEntity<Void> registBoard(
            @Valid @RequestPart(name = "boardRegistRequestDto")BoardRegistRequestDto boardRegistRequestDto,
            @RequestPart(name = "thumbnail")MultipartFile thumbnailFile) throws Exception {
        boardService.registBoard(boardRegistRequestDto, thumbnailFile);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    /**
     * 게시글 목록 조회 (검색, 페이징)
     */
    @GetMapping
    public ResponseEntity<Page<BoardResponseDto>> getListBoard(@RequestParam(name = "page", required = false, defaultValue = "0") int page,
                                                               @RequestParam(name = "size", required = false, defaultValue = "12") int size,
                                                               @RequestParam(name = "usernickname", required = false) String userNickname,
                                                               @RequestParam(name = "title", required = false) String title,
                                                               @RequestParam(value = "type", required = false) BoardType type) throws Exception {
        Page<BoardResponseDto> boardResponseDtos = boardService.getListBoard(page, size, userNickname, title, type);

        if (boardResponseDtos.hasContent()) {
            return new ResponseEntity<>(boardResponseDtos, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /**
     * 게시글 상세 조회
     */
    @GetMapping("/{id}")
    public ResponseEntity<BoardResponseDto> getDetailBoard(@PathVariable("id") int id) throws Exception {
        BoardResponseDto boardResponseDto = boardService.getDetailBoard(id);

        return new ResponseEntity<>(boardResponseDto, HttpStatus.OK);
    }


    /**
     * 게시글 수정
     */
    @PatchMapping("/{id}")
    public ResponseEntity<Void> modifyBoard(@PathVariable("id") int id,
                                            @Valid @RequestPart(name = "boardEditRequestDto")BoardEditRequestDto boardEditRequestDto,
                                            @RequestPart(name =  "thumbnail", required = false) MultipartFile thumbnailFile) throws Exception {
        boardService.editBoard(id, boardEditRequestDto, thumbnailFile);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * 게시글 삭제
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeBoard(@PathVariable("id") int id) throws Exception {
        boardService.removeBoard(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
