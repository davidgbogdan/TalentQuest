package live.talentquest.resource;

import jakarta.validation.Valid;
import live.talentquest.dto.candidate.CandidateRequestDto;
import live.talentquest.dto.candidate.CandidateResponseDto;
import live.talentquest.dto.candidate.CandidateUpdateDto;
import live.talentquest.dto.security.JwtDto;
import live.talentquest.dto.security.UserSessionDto;
import live.talentquest.service.CandidateService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/candidates")
public class CandidateResource {

    private CandidateService candidateService;

    @PostMapping()
    public CandidateResponseDto register(@RequestBody @Valid CandidateRequestDto candidateRequestDto) {
        return candidateService.register(candidateRequestDto);
    }

    @PostMapping(path = "/sessions")
    public JwtDto login(@RequestBody @Valid UserSessionDto userSessionDto) {
        return candidateService.login(userSessionDto);
    }

    @GetMapping("/me")
    @Secured("CANDIDATE")
    public CandidateResponseDto getProfile() {
        return candidateService.getProfile();
    }

    @PutMapping("/me")
    @Secured("CANDIDATE")
    public CandidateResponseDto updateProfile(@RequestBody @Valid CandidateUpdateDto candidateUpdateDto) {
        return candidateService.updateProfile(candidateUpdateDto);
    }
}
