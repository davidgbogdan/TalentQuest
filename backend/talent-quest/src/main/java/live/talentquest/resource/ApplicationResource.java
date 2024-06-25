package live.talentquest.resource;

import live.talentquest.dto.application.ApplicationRequestDto;
import live.talentquest.service.ApplicationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@AllArgsConstructor
@RestController
@RequestMapping("/applications")
public class ApplicationResource {
    private final ApplicationService applicationService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void applyToJob(@RequestParam Long jobId, @RequestParam("cvFile") MultipartFile cvFile) throws IOException {
        ApplicationRequestDto applicationRequestDto = new ApplicationRequestDto();
        applicationRequestDto.setJobId(jobId);
        applicationRequestDto.setCvFile(cvFile);
        applicationService.applyToJob(applicationRequestDto);
    }
}
