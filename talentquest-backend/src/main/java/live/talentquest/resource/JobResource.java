package live.talentquest.resource;

import jakarta.validation.Valid;
import live.talentquest.dto.job.JobRequestDto;
import live.talentquest.dto.job.JobResponseDto;
import live.talentquest.service.JobService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/jobs")
public class JobResource {
    private JobService jobService;

    @GetMapping
    public List<JobResponseDto> getAllJobs(){
        return jobService.getAllJobs();
    }

    @GetMapping("/me")
    @Secured({"RECRUITER"})
    public List<JobResponseDto> getJobsForRecruiter(){
        return jobService.getJobs();
    }

    @PostMapping("/me")
    @Secured({"RECRUITER"})
    public JobResponseDto addJob(@RequestBody @Valid JobRequestDto jobRequestDto){
        return jobService.addJob(jobRequestDto);
    }

    @DeleteMapping("/{id}")
    public void deleteJob(@PathVariable long id){
        jobService.deleteJob(id);
    }
}
