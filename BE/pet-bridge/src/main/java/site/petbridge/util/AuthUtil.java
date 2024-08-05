package site.petbridge.util;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import site.petbridge.domain.user.domain.User;
import site.petbridge.domain.user.repository.UserRepository;
import site.petbridge.global.exception.ErrorCode;
import site.petbridge.global.exception.PetBridgeException;
import site.petbridge.global.login.userdetail.CustomUserDetail;

@Component
@RequiredArgsConstructor
public class AuthUtil {

    private final UserRepository userRepository;

    public User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getPrincipal() == "anonymousUser") {
            throw new PetBridgeException(ErrorCode.UNAUTHORIZED);
        }

        CustomUserDetail userDetails = (CustomUserDetail) authentication.getPrincipal();
        return userRepository.findByIdAndDisabledFalse(userDetails.getId())
                .orElseThrow(() -> new PetBridgeException(ErrorCode.UNAUTHORIZED));
    }
}
