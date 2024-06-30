package live.talentquest.resource;

import jakarta.validation.Valid;
import live.talentquest.dto.recruiter.RecruiterRequestDto;
import live.talentquest.dto.recruiter.RecruiterResponseDto;
import live.talentquest.dto.recruiter.RecruiterUpdateDto;
import live.talentquest.dto.security.JwtDto;
import live.talentquest.dto.security.UserSessionDto;
import live.talentquest.service.RecruiterService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/recruiters")
public class RecruiterResource {

    private RecruiterService recruiterService;

    @PostMapping()
    public RecruiterResponseDto register(@RequestBody @Valid RecruiterRequestDto recruiterRequestDto) {
        return recruiterService.register(recruiterRequestDto);
    }

    @PostMapping(path = "/sessions")
    public JwtDto login(@RequestBody @Valid UserSessionDto userSessionDto) {
        return recruiterService.login(userSessionDto);
    }

    @GetMapping("/me")
    @Secured("RECRUITER")
    public RecruiterResponseDto getProfile() {
        return recruiterService.getProfile();
    }

    @PutMapping("/me")
    @Secured("RECRUITER")
    public RecruiterResponseDto updateProfile(@RequestBody @Valid RecruiterUpdateDto recruiterUpdateDto) {
        return recruiterService.updateProfile(recruiterUpdateDto);
    }
}
