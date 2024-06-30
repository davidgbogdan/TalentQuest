package live.talentquest.resource;

import live.talentquest.dto.interview.InterviewRequestDto;
import live.talentquest.entity.Interview;
import live.talentquest.service.InterviewService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/interviews")
public class InterviewResource {
    private final InterviewService interviewService;

    @PostMapping
    public Interview scheduleInterview(@RequestBody InterviewRequestDto interviewRequestDto) {
        return interviewService.scheduleInterview(interviewRequestDto);
    }
}
