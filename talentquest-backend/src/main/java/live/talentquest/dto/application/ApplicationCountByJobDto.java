package live.talentquest.dto.application;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApplicationCountByJobDto {
    private Long jobId;
    private String jobName;
    private Long applicationCount;
}