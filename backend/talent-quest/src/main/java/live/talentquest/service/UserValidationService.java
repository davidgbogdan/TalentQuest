package live.talentquest.service;

import live.talentquest.exception.user.UserAlreadyRegisteredException;
import live.talentquest.repository.CandidateRepository;
import live.talentquest.repository.RecruiterRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserValidationService {
    private final CandidateRepository candidateRepository;
    private final RecruiterRepository recruiterRepository;

    public void validateEmail(String email){
        if (candidateRepository.findByEmail(email).isPresent() || recruiterRepository.findByEmail(email).isPresent()) {
            throw new UserAlreadyRegisteredException();
        }
    }
}