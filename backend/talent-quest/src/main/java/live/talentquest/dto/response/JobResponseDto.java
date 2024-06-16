package live.talentquest.dto.response;

import live.talentquest.enums.JobType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobResponseDto {
    private Long id;
    private String title;
    private String description;
    private String location;
    private JobType type;
    private String company;
    private String industry;
    private Double salary;
    private String recruiterUsername;
}
