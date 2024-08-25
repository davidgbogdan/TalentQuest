package live.talentquest.resource;

import live.talentquest.dto.application.*;
import live.talentquest.entity.CV;
import live.talentquest.service.ApplicationService;
import lombok.AllArgsConstructor;
import org.apache.tika.exception.TikaException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.xml.sax.SAXException;

import java.io.IOException;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/applications")
public class ApplicationResource {
    private final ApplicationService applicationService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Secured("CANDIDATE")
    public void applyToJob(@RequestParam Long jobId, @RequestParam("cvFile") MultipartFile cvFile) throws IOException, TikaException, SAXException {
        ApplicationRequestDto applicationRequestDto = new ApplicationRequestDto();
        applicationRequestDto.setJobId(jobId);
        applicationRequestDto.setCvFile(cvFile);
        applicationService.applyToJob(applicationRequestDto);
    }
    @GetMapping("/job/{jobId}")
    @Secured("RECRUITER")
    public List<ApplicationResponseDto> getApplicationsByJob(@PathVariable Long jobId) {
        return applicationService.getApplicationsByJob(jobId);
    }

    @GetMapping("/{applicationId}/cv")
    @Secured("RECRUITER")
    public ResponseEntity<byte[]> getCvByApplicationId(@PathVariable Long applicationId) {
        CV cv = applicationService.getCvByApplicationId(applicationId);
        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=" + cv.getFileName())
                .body(cv.getFileData());
    }
}
