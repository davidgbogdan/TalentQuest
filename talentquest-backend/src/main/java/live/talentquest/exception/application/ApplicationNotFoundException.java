package live.talentquest.exception.application;

import live.talentquest.exception.GeneralException;
import org.springframework.http.HttpStatus;

public class ApplicationNotFoundException extends GeneralException {
    public ApplicationNotFoundException(){
        setHttpStatus(HttpStatus.NOT_FOUND);
        setMessage("APPLICATION_NOT_FOUND");
    }
}
