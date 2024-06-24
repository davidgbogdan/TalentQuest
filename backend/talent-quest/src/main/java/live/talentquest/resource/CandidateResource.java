package live.talentquest.resource;

import jakarta.validation.Valid;
import live.talentquest.dto.candidate.CandidateRequestDto;
import live.talentquest.dto.candidate.CandidateResponseDto;
import live.talentquest.dto.security.JwtDto;
import live.talentquest.dto.security.UserSessionDto;
import live.talentquest.service.CandidateService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
