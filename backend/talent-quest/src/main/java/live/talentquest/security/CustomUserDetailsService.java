package live.talentquest.security;

import live.talentquest.entity.Candidate;
import live.talentquest.entity.Recruiter;
import live.talentquest.repository.CandidateRepository;
import live.talentquest.repository.RecruiterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final RecruiterRepository recruiterRepository;
    private final CandidateRepository candidateRepository;

    @Autowired
    public CustomUserDetailsService(RecruiterRepository recruiterRepository, CandidateRepository candidateRepository) {
        this.recruiterRepository = recruiterRepository;
        this.candidateRepository = candidateRepository;
    }

    @Override
    public CustomUserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Recruiter recruiter = recruiterRepository.findByEmail(email)
                .orElse(null);
        if (recruiter != null) {
            return new CustomUserDetails(recruiter);
        }
        Candidate candidate = candidateRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        return new CustomUserDetails(candidate);
    }
}
