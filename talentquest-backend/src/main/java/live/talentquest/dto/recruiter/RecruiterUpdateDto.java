package live.talentquest.dto.recruiter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecruiterUpdateDto {
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
}
