package live.talentquest.dto.application;

import live.talentquest.enums.ApplicationStatus;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ApplicationResponseDto {
    private Long id;
    private String candidateName;
    private double matchScore;
    private ApplicationStatus applicationStatus;
}
