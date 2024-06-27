package live.talentquest.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@Data
@NoArgsConstructor
public class GeneralException extends RuntimeException {
    private HttpStatus httpStatus;
    private String message;
}
