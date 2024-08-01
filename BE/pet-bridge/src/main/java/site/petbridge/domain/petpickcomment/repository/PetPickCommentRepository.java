package site.petbridge.domain.petpickcomment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.petbridge.domain.petpickcomment.domain.PetPickComment;

public interface PetPickCommentRepository extends JpaRepository<PetPickComment, Long> {
}
