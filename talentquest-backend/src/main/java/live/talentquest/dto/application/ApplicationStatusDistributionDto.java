package live.talentquest.dto.application;

import live.talentquest.enums.ApplicationStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApplicationStatusDistributionDto {
    private ApplicationStatus status;
    private Long count;
}
