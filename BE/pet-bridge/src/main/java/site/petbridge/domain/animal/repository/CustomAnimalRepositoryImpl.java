package site.petbridge.domain.animal.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
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
    public Page<Animal> findAnimalsByDynamicQuery(int page, int size, String species, String kindCd, String careAddr, List<Integer> filteredAnimalIds, Pageable pageable) {
        QAnimal animal = QAnimal.animal;

        BooleanExpression speciesExpression = species != null ? animal.species.eq(species) : null;
        BooleanExpression kindCdExpression = kindCd != null ? animal.kindCd.contains(kindCd) : null;
        BooleanExpression careAddrExpression = careAddr != null ? animal.careAddr.contains(careAddr) : null;
        BooleanExpression filteredIdsExpression = animal.id.in(filteredAnimalIds);

        List<Animal> animals = queryFactory
                .selectFrom(animal)
                .where(speciesExpression, kindCdExpression, careAddrExpression, filteredIdsExpression, animal.disabled.isFalse())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(animal.id.desc())
                .fetch();

        long total = queryFactory
                .selectFrom(animal)
                .where(speciesExpression, kindCdExpression, careAddrExpression, filteredIdsExpression, animal.disabled.isFalse())
                .fetchCount();

        return new PageImpl<>(animals, pageable, total);
    }
}
