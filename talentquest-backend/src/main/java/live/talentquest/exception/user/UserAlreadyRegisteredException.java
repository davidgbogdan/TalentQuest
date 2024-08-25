package live.talentquest.exception.user;

import live.talentquest.exception.GeneralException;
import org.springframework.http.HttpStatus;

public class UserAlreadyRegisteredException extends GeneralException {
    public UserAlreadyRegisteredException() {
        setHttpStatus(HttpStatus.CONFLICT);
        setMessage("A_USER_ALREADY_HAS_THIS_EMAIL");
    }
}
