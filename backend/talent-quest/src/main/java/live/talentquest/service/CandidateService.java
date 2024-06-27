package live.talentquest.service;

import live.talentquest.dto.candidate.CandidateRequestDto;
import live.talentquest.dto.candidate.CandidateResponseDto;
import live.talentquest.dto.security.JwtDto;
import live.talentquest.dto.security.UserSessionDto;
import live.talentquest.entity.Candidate;
import live.talentquest.enums.Role;
import live.talentquest.exception.recruiter.RecruiterNotFoundException;
import live.talentquest.repository.CandidateRepository;
import live.talentquest.security.CustomUserDetails;
import live.talentquest.security.JwtProvider;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CandidateService {
    private CandidateRepository candidateRepository;
    private ModelMapper modelMapper;
    private AuthenticationManager authenticationManager;
    private PasswordEncoder passwordEncoder;
    private JwtProvider jwtProvider;
    private UserValidationService userValidationService;

    private Candidate getCurrentCandidate() {
        return (Candidate) ((CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser();
    }

    public CandidateResponseDto register(CandidateRequestDto candidateRequestDto) {
        userValidationService.validateEmail(candidateRequestDto.getEmail());
        var candidate = modelMapper.map(candidateRequestDto, Candidate.class);
        candidate.setPassword(passwordEncoder.encode(candidateRequestDto.getPassword()));
        var savedEntity = candidateRepository.save(candidate);
        return modelMapper.map(savedEntity, CandidateResponseDto.class);
    }

    public JwtDto login(UserSessionDto userSessionDto) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                userSessionDto.getEmail(),
                userSessionDto.getPassword()
        ));

        var user = candidateRepository.findByEmail(userSessionDto.getEmail())
                .orElseThrow(RecruiterNotFoundException::new);

        String jwt = jwtProvider.generateJwt(user);
        Role role = Role.CANDIDATE;

        return new JwtDto(jwt, role);
    }
}
