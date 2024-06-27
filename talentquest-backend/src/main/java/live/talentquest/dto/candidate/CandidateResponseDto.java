package live.talentquest.dto.candidate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CandidateResponseDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
}
