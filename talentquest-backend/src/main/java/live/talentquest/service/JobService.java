package live.talentquest.service;

import live.talentquest.dto.job.JobRequestDto;
import live.talentquest.dto.job.JobResponseDto;
import live.talentquest.entity.Candidate;
import live.talentquest.entity.Job;
import live.talentquest.entity.Recruiter;
import live.talentquest.repository.JobRepository;
import live.talentquest.security.CustomUserDetails;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class JobService {
    private JobRepository jobRepository;
    private ModelMapper modelMapper;

    private Recruiter getCurrentRecruiter() {
        return (Recruiter) ((CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser();
    }

    public List<JobResponseDto> getAllJobs() {
        return jobRepository.findAll()
                .stream()
                .map(course -> modelMapper.map(course, JobResponseDto.class))
                .toList();
    }

    public List<JobResponseDto> getJobs() {
        var recruiter = getCurrentRecruiter();
        return recruiter
                .getJobs()
                .stream()
                .map(job -> modelMapper.map(job, JobResponseDto.class))
                .toList();
    }

    public JobResponseDto addJob(JobRequestDto jobRequestDto) {
        var recruiter = getCurrentRecruiter();

        var job = modelMapper.map(jobRequestDto, Job.class);
        job.setRecruiter(recruiter);

        var savedEntity = jobRepository.save(job);
        return modelMapper.map(savedEntity, JobResponseDto.class);
    }


}
