package site.petbridge.domain.boardcomment.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.petbridge.domain.boardcomment.dto.request.BoardCommentEditRequestDto;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access =  AccessLevel.PROTECTED)
@Table(name = "board_comments")
public class BoardComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "board_id")
    private int boardId;

    @Column(name = "user_id")
    private int userId;

    private String content;

    @Column(name = "regist_time")
    private LocalDateTime registTime = LocalDateTime.now();

    private boolean disabled = false;

    @Builder
    public BoardComment(int userId, int boardId, String content) {
        this.userId = userId;
        this.boardId = boardId;
        this.content = content;
    }

    public void update(BoardCommentEditRequestDto boardCommentEditRequestDto) {
        this.content = boardCommentEditRequestDto.getContent();
    }

    public void disable() {
        this.disabled = true;
    }
}
