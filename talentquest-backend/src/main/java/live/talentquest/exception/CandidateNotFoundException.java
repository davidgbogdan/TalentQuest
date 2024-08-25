package live.talentquest.exception;

import org.springframework.http.HttpStatus;

public class CandidateNotFoundException extends GeneralException{
    public CandidateNotFoundException(){
        setHttpStatus(HttpStatus.NOT_FOUND);
        setMessage("CANDIDATE_NOT_FOUND");
    }
}
