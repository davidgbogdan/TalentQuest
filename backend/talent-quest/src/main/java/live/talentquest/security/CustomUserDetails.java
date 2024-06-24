package live.talentquest.security;

import live.talentquest.entity.Candidate;
import live.talentquest.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Data
@NoArgsConstructor
@SuperBuilder
@AllArgsConstructor
public class CustomUserDetails implements UserDetails {
    private String email;
    private String password;
    private List<SimpleGrantedAuthority> roles;
    private User user;

    public CustomUserDetails(User user) {
        this.user = user;
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.roles = Collections.singletonList(new SimpleGrantedAuthority(user instanceof Candidate ? "CANDIDATE" : "RECRUITER"));
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
