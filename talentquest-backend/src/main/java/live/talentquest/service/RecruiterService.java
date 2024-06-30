package live.talentquest.service;

import live.talentquest.dto.recruiter.RecruiterRequestDto;
import live.talentquest.dto.recruiter.RecruiterResponseDto;
import live.talentquest.dto.recruiter.RecruiterUpdateDto;
import live.talentquest.dto.security.JwtDto;
import live.talentquest.dto.security.UserSessionDto;
import live.talentquest.entity.Candidate;
import live.talentquest.entity.Recruiter;
import live.talentquest.enums.Role;
import live.talentquest.exception.recruiter.RecruiterNotFoundException;
import live.talentquest.repository.RecruiterRepository;
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
public class RecruiterService {
    private RecruiterRepository recruiterRepository;
    private ModelMapper modelMapper;
    private AuthenticationManager authenticationManager;
    private PasswordEncoder passwordEncoder;
    private JwtProvider jwtProvider;
    private UserValidationService userValidationService;

    private Recruiter getCurrentRecruiter() {
        return (Recruiter) ((CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser();
    }

    public RecruiterResponseDto register(RecruiterRequestDto recruiterRequestDto) {
        userValidationService.validateEmail(recruiterRequestDto.getEmail());
        var recruiter = modelMapper.map(recruiterRequestDto, Recruiter.class);
        recruiter.setPassword(passwordEncoder.encode(recruiterRequestDto.getPassword()));
        var savedEntity = recruiterRepository.save(recruiter);
        return modelMapper.map(savedEntity, RecruiterResponseDto.class);
    }

    public JwtDto login(UserSessionDto userSessionDto) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                userSessionDto.getEmail(),
                userSessionDto.getPassword()
        ));

        var user = recruiterRepository.findByEmail(userSessionDto.getEmail())
                .orElseThrow(RecruiterNotFoundException::new);

        String jwt = jwtProvider.generateJwt(user);
        Role role = Role.RECRUITER;

        return new JwtDto(jwt, role);
    }

    public RecruiterResponseDto getProfile() {
        var currentRecruiter = getCurrentRecruiter();
        return modelMapper.map(currentRecruiter, RecruiterResponseDto.class);
    }

    public RecruiterResponseDto updateProfile(RecruiterUpdateDto recruiterUpdateDto) {
        var currentRecruiter = getCurrentRecruiter();
        modelMapper.map(recruiterUpdateDto, currentRecruiter);
        var updatedRecruiter = recruiterRepository.save(currentRecruiter);
        return modelMapper.map(updatedRecruiter, RecruiterResponseDto.class);
    }
}
