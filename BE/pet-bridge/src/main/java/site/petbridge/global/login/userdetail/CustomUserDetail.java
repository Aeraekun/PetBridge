package site.petbridge.global.login.userdetail;

import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import site.petbridge.domain.user.domain.User;

import java.util.Collection;
import java.util.List;

@ToString
public class CustomUserDetail implements UserDetails {
    private User user;

    public CustomUserDetail(User user) {
        this.user = user;
    }

    public User getUser(){
        return user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }

    public int getId() { return user.getId(); }
}
