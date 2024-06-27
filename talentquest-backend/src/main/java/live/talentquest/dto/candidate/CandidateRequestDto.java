package live.talentquest.dto.candidate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CandidateRequestDto {
    @NotBlank
    @Size(min = 2, message = "First name must be at least 2 characters long")
    @Pattern(regexp = "^[a-zA-Z]+$", message = "First name must not contain digits")
    private String firstName;
    @NotBlank
    @Size(min = 2, message = "First name must be at least 2 characters long")
    @Pattern(regexp = "^[a-zA-Z]+$", message = "First name must not contain digits")
    private String lastName;
    @NotBlank
    @Email(message = "Email should be valid and contain '@'")
    private String email;
    @NotBlank
    @Size(min = 4, message = "Password must be at least 8 characters long")
    private String password;
    @NotBlank
    @Pattern(regexp = "^[0-9]+$", message = "Phone number must contain only digits")
    private String phone;
}
