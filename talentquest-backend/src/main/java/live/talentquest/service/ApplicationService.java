package live.talentquest.service;

import live.talentquest.dto.application.*;
import live.talentquest.entity.Application;
import live.talentquest.entity.CV;
import live.talentquest.entity.Candidate;
import live.talentquest.entity.Job;
import live.talentquest.enums.ApplicationStatus;
import live.talentquest.repository.ApplicationRepository;
import live.talentquest.repository.JobRepository;
import live.talentquest.security.CustomUserDetails;
import lombok.AllArgsConstructor;
import org.apache.tika.exception.TikaException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.xml.sax.SAXException;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ApplicationService {
    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;

    private Candidate getCurrentCandidate() {
        return (Candidate) ((CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser();
    }

    public void applyToJob(ApplicationRequestDto applicationRequestDto) throws IOException, TikaException, SAXException {
        var candidate = getCurrentCandidate();
        var job = jobRepository.findById(applicationRequestDto.getJobId())
                .orElseThrow(() -> new RuntimeException("Job not found"));

        Application application = Application.builder()
                .applicationStatus(ApplicationStatus.PENDING)
                .candidate(candidate)
                .job(job)
                .build();

        saveCV(application, applicationRequestDto.getCvFile());

        Set<String> cvKeywords = extractCvKeywords(applicationRequestDto.getCvFile());
        Set<String> jobKeywords = extractJobKeywords(job.getDescription());
        double matchScore = KeywordMatcherService.calculateMatchScore(cvKeywords, jobKeywords);

        application.setMatchScore(matchScore);

        applicationRepository.save(application);
    }

    private void saveCV(Application application, MultipartFile cvFile) throws IOException {
        CV cv = new CV();
        cv.setFileName(cvFile.getOriginalFilename());
        cv.setFileData(cvFile.getBytes());
        cv.setApplication(application);

        application.setCv(cv);
    }

    private Set<String> extractCvKeywords(MultipartFile cvFile) throws IOException, TikaException, SAXException {
        try (ByteArrayInputStream inputStream = new ByteArrayInputStream(cvFile.getBytes())) {
            String text = KeywordExtractorService.extractText(inputStream, cvFile.getContentType());
            return KeywordExtractorService.extractKeywords(text);
        }
    }

    private Set<String> extractJobKeywords(String jobDescription) {
        return KeywordExtractorService.extractKeywords(jobDescription);
    }

    public List<ApplicationResponseDto> getApplicationsByJob(Long jobId) {
        var job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        List<Application> applications = applicationRepository.findByJob(job);
        return applications.stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    private ApplicationResponseDto mapToResponseDto(Application application) {
        return ApplicationResponseDto.builder()
                .id(application.getId())
                .candidateName(application.getCandidate().getFirstName() + " " + application.getCandidate().getLastName())
                .matchScore(application.getMatchScore())
                .applicationStatus(application.getApplicationStatus())
                .build();
    }

    public CV getCvByApplicationId(Long applicationId) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        return application.getCv();
    }

    public List<ApplicationCountByJobDto> getApplicationCountByJob() {
        List<Job> jobs = jobRepository.findAll();
        return jobs.stream()
                .map(job -> new ApplicationCountByJobDto(job.getId(), job.getName(), applicationRepository.countByJob(job)))
                .collect(Collectors.toList());
    }

    public List<ApplicationStatusDistributionDto> getApplicationStatusDistribution() {
        return Arrays.stream(ApplicationStatus.values())
                .map(status -> new ApplicationStatusDistributionDto(status, applicationRepository.countByApplicationStatus(status)))
                .collect(Collectors.toList());
    }

    public List<AverageMatchScoreByJobDto> getAverageMatchScoreByJob() {
        List<Job> jobs = jobRepository.findAll();
        return jobs.stream()
                .map(job -> {
                    List<Application> applications = applicationRepository.findByJob(job);
                    double averageMatchScore = applications.stream().mapToDouble(Application::getMatchScore).average().orElse(0);
                    return new AverageMatchScoreByJobDto(job.getId(), job.getName(), averageMatchScore);
                })
                .collect(Collectors.toList());
    }
}
