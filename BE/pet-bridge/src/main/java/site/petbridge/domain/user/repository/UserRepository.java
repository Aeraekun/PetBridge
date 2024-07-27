package site.petbridge.domain.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.petbridge.domain.user.domain.enums.SocialType;
import site.petbridge.domain.user.domain.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByNickname(String nickname);

    Optional<User> findByRefreshToken(String refreshToken);

    Optional<User> findBySocialTypeAndSocialId(SocialType socialType, String socialId);

    boolean existsByNickname(String nickname);
}
