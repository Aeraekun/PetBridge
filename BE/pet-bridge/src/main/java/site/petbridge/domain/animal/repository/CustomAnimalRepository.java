package site.petbridge.domain.animal.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import site.petbridge.domain.animal.domain.Animal;

import java.util.List;

public interface CustomAnimalRepository {
    Page<Animal> findAnimalsByDynamicQuery(int page, int size, String species, String kindCd, String careAddr, List<Integer> filteredAnimalIds, Pageable pageable);
}
