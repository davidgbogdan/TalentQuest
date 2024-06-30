package live.talentquest.service;

import live.talentquest.dto.interview.InterviewRequestDto;
import live.talentquest.entity.Interview;
import live.talentquest.repository.InterviewRepository;
import lombok.AllArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class InterviewService {
    private InterviewRepository interviewRepository;
    private final MailService mailService;

    public Interview scheduleInterview(InterviewRequestDto interviewRequest) {
        Interview interview = new Interview();
        interview.setCandidateName(interviewRequest.getCandidateName());
        interview.setCandidateEmail(interviewRequest.getCandidateEmail());
        interview.setRecruiterEmail(interviewRequest.getRecruiterEmail());
        interview.setDescription(interviewRequest.getDescription());
        interview.setLocation(interviewRequest.getLocation());
        interview.setStartTime(interviewRequest.getStartTime());
        interview.setEndTime(interviewRequest.getEndTime());

        Interview savedInterview = interviewRepository.save(interview);

        sendInterviewEmail(savedInterview);

        return savedInterview;
    }

    private void sendInterviewEmail(Interview interview) {
        String subject = "Scheduled Interview with " + interview.getCandidateName();
        String message = String.format("You have scheduled an interview with %s.%n%nDetails:%nDescription: %s%nLocation: %s%nStart Time: %s%nEnd Time: %s",
                interview.getCandidateName(), interview.getDescription(), interview.getLocation(), interview.getStartTime(), interview.getEndTime());

        mailService.sendEmail(interview.getRecruiterEmail(), subject, message);
        mailService.sendEmail(interview.getCandidateEmail(), subject, message);
    }
}
