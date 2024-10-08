package live.talentquest.dto.security;

import live.talentquest.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtDto {
    private String jwt;
    private Role role;
}
