package live.talentquest.configuration;

import live.talentquest.exception.GeneralException;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(value = {GeneralException.class})
    public ResponseEntity<Object> handleException(RuntimeException e, WebRequest request) {
        var generalException = (GeneralException) e;
        var responseBody = new ErrorResponse(generalException.getMessage());

        return handleExceptionInternal(
                e,
                responseBody,
                new HttpHeaders(),
                generalException.getHttpStatus(),
                request
        );
    }

    @AllArgsConstructor
    @Data
    static class ErrorResponse {
        private String message;
    }
}
