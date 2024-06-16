package live.talentquest.dto.request;

import jakarta.validation.constraints.NotBlank;
import live.talentquest.enums.JobType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobRequestDto {
    @NotBlank
    private String title;
    @NotBlank
    private String description;
    @NotBlank
    private String location;
    @NotBlank
    private JobType type;
    @NotBlank
    private String company;
    @NotBlank
    private String industry;
    @NotBlank
    private Double salary;
    @NotBlank
    private String recruiterUsername;
}
