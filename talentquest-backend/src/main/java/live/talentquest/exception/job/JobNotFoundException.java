package live.talentquest.exception.job;

import live.talentquest.exception.GeneralException;
import org.springframework.http.HttpStatus;

public class JobNotFoundException extends GeneralException {
    public JobNotFoundException(){
        this.setHttpStatus(HttpStatus.NOT_FOUND);
        this.setMessage("JOB_NOT_FOUND");
    }
}
