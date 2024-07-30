package site.petbridge.domain.board.repository;

import static site.petbridge.domain.board.domain.QBoard.*;
import static site.petbridge.domain.boardcomment.domain.QBoardComment.*;
import static site.petbridge.domain.user.domain.QUser.*;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.querydsl.jpa.impl.JPAQueryFactory;

import jakarta.transaction.Transactional;
import lombok.Data;
import lombok.NoArgsConstructor;
import site.petbridge.domain.board.dto.response.BoardResponseDto;
import site.petbridge.domain.board.dto.response.QBoardResponseDto;

@Repository
@Transactional
@Data
@NoArgsConstructor
public class BoardCustomRepositoryImpl implements BoardCustomRepository {

	private JPAQueryFactory queryFactory;

	@Autowired
	public BoardCustomRepositoryImpl(JPAQueryFactory queryFactory) {
		this.queryFactory = queryFactory;
	}

	@Override
	public List<BoardResponseDto> findAllBoardResponseDtos() {
		return queryFactory
			.select(new QBoardResponseDto(
				board.id,
				board.userId,
				board.animalId,
				board.type.stringValue(),
				board.thumbnail,
				board.title,
				board.content,
				board.lat,
				board.lon,
				board.registTime,
				board.disabled,
				user.nickname,
				user.image,
				boardComment.count().intValue()
			))
			.from(board)
			.join(user).on(board.userId.eq(user.id))
			.leftJoin(boardComment).on(board.id.eq(boardComment.boardId))
			.groupBy(board.id, user.nickname, user.image)
			.fetch();
	}

	@Override
	public BoardResponseDto findBoardResponseDtoById(int id) {
		return queryFactory
			.select(new QBoardResponseDto(
				board.id,
				board.userId,
				board.animalId,
				board.type.stringValue(),
				board.thumbnail,
				board.title,
				board.content,
				board.lat,
				board.lon,
				board.registTime,
				board.disabled,
				user.nickname,
				user.image,
				boardComment.count().intValue()
			))
			.from(board)
			.join(user).on(board.userId.eq(user.id))
			.leftJoin(boardComment).on(board.id.eq(boardComment.boardId))
			.groupBy(board.id, user.nickname, user.image)
			.where(board.id.eq(id))
			.fetchOne();
	}
}
