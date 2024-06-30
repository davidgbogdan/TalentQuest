package live.talentquest.dto.interview;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InterviewRequestDto {
    private String candidateName;
    private String candidateEmail;
    private String recruiterEmail;
    private String description;
    private String location;
    private LocalDateTime startTime;
    private LocalDateTime endTime;

}
