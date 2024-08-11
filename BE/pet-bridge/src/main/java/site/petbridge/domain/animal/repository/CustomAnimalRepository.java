package site.petbridge.domain.animal.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import site.petbridge.domain.animal.domain.Animal;

public interface CustomAnimalRepository {
    Page<Animal> findAnimalsWithFilters(String species, String kindCd, String careAddr, Pageable pageable);
}
