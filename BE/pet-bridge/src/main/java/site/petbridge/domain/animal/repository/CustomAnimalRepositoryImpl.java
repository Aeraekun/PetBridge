package site.petbridge.domain.animal.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import site.petbridge.domain.animal.domain.Animal;

import java.util.List;

import site.petbridge.domain.animal.domain.QAnimal;

@RequiredArgsConstructor
public class CustomAnimalRepositoryImpl implements CustomAnimalRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public Page<Animal> findAnimalsWithFilters(String species, String kindCd, String careAddr, Pageable pageable) {
        QAnimal animal = QAnimal.animal;

        BooleanBuilder builder = new BooleanBuilder();

        if (species != null) {
            builder.and(animal.species.eq(species));
        }
        if (kindCd != null) {
            builder.and(animal.kindCd.containsIgnoreCase(kindCd));
        }
        if (careAddr != null) {
            builder.and(animal.careAddr.containsIgnoreCase(careAddr));
        }
        builder.and(animal.disabled.isFalse()); // 기본적으로 disabled가 false인 항목만 가져옴

        List<Animal> animals = queryFactory
                .selectFrom(animal)
                .where(builder)
                .orderBy(animal.id.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        long total = queryFactory
                .selectFrom(animal)
                .where(builder)
                .fetchCount();

        return new PageImpl<>(animals, pageable, total);
    }
}
