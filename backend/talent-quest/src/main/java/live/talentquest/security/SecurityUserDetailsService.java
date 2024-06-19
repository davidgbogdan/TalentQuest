package live.talentquest.security;

import live.talentquest.repository.CandidateRepository;
import live.talentquest.repository.RecruiterRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
public class SecurityUserDetailsService implements UserDetailsService {
    private final CandidateRepository candidateRepository;
    private final RecruiterRepository recruiterRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return recruiterRepository.findById(username)
                .map(teacher -> {
                    List<GrantedAuthority> authorities = new ArrayList<>();
                    authorities.add(new SimpleGrantedAuthority("RECRUITER"));
                    return new SecurityUserDetails(teacher.getUsername(), teacher.getPassword(), authorities);
                })
                .orElseGet(() -> candidateRepository.findById(username)
                        .map(student -> {
                            List<GrantedAuthority> authorities = new ArrayList<>();
                            authorities.add(new SimpleGrantedAuthority("CANDIDATE"));
                            return new SecurityUserDetails(student.getUsername(), student.getPassword(), authorities);
                        })
                        .orElseThrow(() -> new UsernameNotFoundException("Username or password invalid")));
    }
}
