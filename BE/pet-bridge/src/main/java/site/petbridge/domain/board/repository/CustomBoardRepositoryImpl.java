package site.petbridge.domain.board.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import site.petbridge.domain.animal.domain.QAnimal;
import site.petbridge.domain.board.domain.QBoard;
import site.petbridge.domain.board.domain.enums.BoardType;
import site.petbridge.domain.board.dto.response.BoardResponseDto;
import site.petbridge.domain.boardcomment.domain.QBoardComment;
import site.petbridge.domain.user.domain.QUser;

import java.math.BigDecimal;
import java.util.List;

@RequiredArgsConstructor
public class CustomBoardRepositoryImpl implements CustomBoardRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public BoardResponseDto getDetailBoardById(int id) {
        QBoard board = QBoard.board;
        QUser user = QUser.user;
        QAnimal animal = QAnimal.animal;
        QBoardComment comment = QBoardComment.boardComment;

        BoardResponseDto boardResponseDto = queryFactory
                .select(Projections.constructor(BoardResponseDto.class,
                        board.id,
                        user.id,
                        animal.id,
                        board.boardType,
                        board.thumbnail,
                        board.title,
                        board.content,
                        board.registTime,
                        board.lat,
                        board.lon,
                        board.disabled,

                        user.nickname,
                        user.image,

                        animal.name,
                        animal.filename,

                        comment.count()
                ))
                .from(board)
                .join(user).on(board.userId.eq(user.id))
                .leftJoin(animal).on(board.animalId.eq(animal.id))
                .leftJoin(comment).on(board.id.eq(comment.boardId).and(comment.disabled.isFalse()))
                .where(board.id.eq(id).and(board.disabled.isFalse()))
                .groupBy(board.id, user.id, animal.id)
                .fetchOne();

        return boardResponseDto;
    }

    @Override
    public Page<BoardResponseDto> findAllByUserNickNameAndTypeAndTitleContains(String userNickname, String title, BoardType type, Pageable pageable) {

        QBoard board = QBoard.board;
        QUser user = QUser.user;
        QAnimal animal = QAnimal.animal;
        QBoardComment boardComment = QBoardComment.boardComment;

        List<BoardResponseDto> results = queryFactory
                .select(Projections.constructor(BoardResponseDto.class,
                        board.id,
                        board.userId,
                        board.animalId,
                        board.boardType,
                        board.thumbnail,
                        board.title,
                        board.content,
                        board.registTime,
                        board.lat,
                        board.lon,
                        board.disabled,

                        user.nickname,
                        user.image,

                        animal.name,
                        animal.filename,

                        boardComment.id.count().as("commentCount")
                ))
                .from(board)
                .join(user).on(board.userId.eq(user.id))
                .leftJoin(animal).on(board.animalId.eq(animal.id))
                .leftJoin(boardComment).on(board.id.eq(boardComment.boardId).and(boardComment.disabled.isFalse()))
                .where(
                        board.disabled.isFalse(),
                        userNicknameEq(userNickname,user),
                        titleContains(title, board),
                        boardTypeEq(type, board)
                )
                .groupBy(board.id, user.id, animal.id)
                .orderBy(board.registTime.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        long total = queryFactory
                .select(board.count())
                .from(board)
                .join(user).on(board.userId.eq(user.id))
                .where(
                        board.disabled.isFalse(),
                        userNicknameEq(userNickname, user),
                        titleContains(title,board),
                        boardTypeEq(type, board)
                )
                .fetchOne();

        return new PageImpl<>(results, pageable, total);
    }

    @Override
    public Page<BoardResponseDto> findAllByAnimalIdAndDisabledFalse(int animalId, Pageable pageable) {
        QBoard board = QBoard.board;
        QUser user = QUser.user;
        QAnimal animal = QAnimal.animal;
        QBoardComment boardComment = QBoardComment.boardComment;

        List<BoardResponseDto> results = queryFactory
                .select(Projections.constructor(BoardResponseDto.class,
                        board.id,
                        board.userId,
                        board.animalId,
                        board.boardType,
                        board.thumbnail,
                        board.title,
                        board.content,
                        board.registTime,
                        board.lat,
                        board.lon,
                        board.disabled,

                        user.nickname,
                        user.image,

                        animal.name,
                        animal.filename,

                        boardComment.id.count().as("commentCount")
                ))
                .from(board)
                .join(user).on(board.userId.eq(user.id))
                .leftJoin(animal).on(board.animalId.eq(animal.id))
                .leftJoin(boardComment).on(board.id.eq(boardComment.boardId).and(boardComment.disabled.isFalse()))
                .where(
                        board.animalId.eq(animalId).and(board.disabled.isFalse())
                )
                .groupBy(board.id, user.id, animal.id)
                .orderBy(board.registTime.desc())
                .fetch();

        long total = queryFactory
                .select(board.count())
                .from(board)
                .where(board.animalId.eq(animalId).and(board.disabled.isFalse()))
                .fetchOne();

        return new PageImpl<>(results, pageable, total);
    }

    public List<BoardResponseDto> findAllByLocationFiltering(double lat, double lon) {
        QBoard board = QBoard.board;
        QUser user = QUser.user;
        QAnimal animal = QAnimal.animal;
        QBoardComment boardComment = QBoardComment.boardComment;

        return queryFactory
                .select(Projections.constructor(BoardResponseDto.class,
                        board.id,
                        board.userId,
                        board.animalId,
                        board.boardType,
                        board.thumbnail,
                        board.title,
                        board.content,
                        board.registTime,
                        board.lat,
                        board.lon,
                        board.disabled,

                        user.nickname,
                        user.image,

                        animal.name,
                        animal.filename,

                        boardComment.id.count().as("commentCount")
                ))
                .from(board)
                .join(user).on(board.userId.eq(user.id))
                .leftJoin(animal).on(board.animalId.eq(animal.id))
                .leftJoin(boardComment).on(board.id.eq(boardComment.boardId).and(boardComment.disabled.isFalse()))
                .where(board.disabled.isFalse()
                    .and(board.boardType.eq(BoardType.LOST)))
                .groupBy(board.id)
                .fetch();
    }

    private BooleanExpression userNicknameEq(String userNickname, QUser user) {
        return userNickname != null ? user.nickname.eq(userNickname) : null;
    }

    private BooleanExpression titleContains(String title, QBoard board) {
        return title != null ? board.title.contains(title) : null;
    }

    private BooleanExpression boardTypeEq(BoardType type, QBoard board) {
        return type != null ? board.boardType.eq(type) : null;
    }
}
