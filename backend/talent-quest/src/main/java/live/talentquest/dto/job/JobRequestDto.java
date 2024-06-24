package live.talentquest.dto.job;

import live.talentquest.enums.JobType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobRequestDto {
    private String name;
    private String description;
    private String location;
    private String companyName;
    private Double salary;
    private JobType jobType;
}
