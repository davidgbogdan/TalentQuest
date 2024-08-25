package live.talentquest.exception.recruiter;

import live.talentquest.exception.GeneralException;
import org.springframework.http.HttpStatus;

public class RecruiterNotFoundException extends GeneralException {
    public RecruiterNotFoundException() {
        this.setHttpStatus(HttpStatus.NOT_FOUND);
        this.setMessage("RECRUITER_NOT_FOUND");
    }
}
