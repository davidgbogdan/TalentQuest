package live.talentquest.dto.application;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AverageMatchScoreByJobDto {
    private Long jobId;
    private String jobName;
    private double averageMatchScore;
}
