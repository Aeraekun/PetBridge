package site.petbridge.domain.board.dto.response;

import com.querydsl.core.types.ConstructorExpression;
import com.querydsl.core.types.dsl.*;

import java.sql.Timestamp;

public class QBoardResponseDto extends ConstructorExpression<BoardResponseDto> {

	private static final long serialVersionUID = 1L;

	public QBoardResponseDto(
		NumberPath<Integer> id,
		NumberPath<Integer> userId,
		NumberPath<Integer> animalId,
		StringExpression type,
		StringPath thumbnail,
		StringPath title,
		StringPath content,
		StringPath lat,
		StringPath lon,
		DateTimePath<Timestamp> registTime,
		BooleanPath disabled,
		StringPath userNickname,
		StringPath userImage,
		NumberExpression<Integer> commentCount
	) {
		super(BoardResponseDto.class,
			id,
			userId,
			animalId,
			type,
			thumbnail,
			title,
			content,
			lat,
			lon,
			registTime,
			disabled,
			userNickname,
			userImage,
			commentCount
		);
	}
}
