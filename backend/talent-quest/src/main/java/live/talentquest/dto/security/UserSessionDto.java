package live.talentquest.dto.security;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserSessionDto {
    @NotBlank
    private String email;
    @NotBlank
    private String password;
}