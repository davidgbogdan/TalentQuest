package live.talentquest.service;

import live.talentquest.dto.application.ApplicationRequestDto;
import live.talentquest.entity.Application;
import live.talentquest.entity.CV;
import live.talentquest.entity.Candidate;
import live.talentquest.enums.ApplicationStatus;
import live.talentquest.repository.ApplicationRepository;
import live.talentquest.repository.CandidateRepository;
import live.talentquest.repository.JobRepository;
import live.talentquest.security.CustomUserDetails;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@AllArgsConstructor
public class ApplicationService {
    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final CandidateRepository candidateRepository;

    private Candidate getCurrentCandidate() {
        return (Candidate) ((CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser();
    }

    public void applyToJob(ApplicationRequestDto applicationRequestDto) throws IOException {
        var candidate = getCurrentCandidate();
        var job = jobRepository.findById(applicationRequestDto.getJobId())
                .orElseThrow(() -> new RuntimeException("Job not found"));

        Application application = Application.builder()
                .applicationStatus(ApplicationStatus.PENDING)
                .candidate(candidate)
                .job(job)
                .build();

        saveCV(application, applicationRequestDto.getCvFile());

        applicationRepository.save(application);
    }

    private void saveCV(Application application, MultipartFile cvFile) throws IOException {
        CV cv = new CV();
        cv.setFileName(cvFile.getOriginalFilename());
        cv.setFileData(cvFile.getBytes());
        cv.setApplication(application);

        application.setCv(cv);
    }
}
