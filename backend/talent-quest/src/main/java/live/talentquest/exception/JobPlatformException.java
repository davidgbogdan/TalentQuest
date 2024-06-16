package live.talentquest.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
public class JobPlatformException extends RuntimeException {
    private HttpStatus httpStatus;
    private String message;
}
