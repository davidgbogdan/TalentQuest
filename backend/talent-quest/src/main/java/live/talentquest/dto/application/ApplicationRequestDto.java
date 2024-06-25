package live.talentquest.dto.application;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ApplicationRequestDto {
    private Long jobId;
    private MultipartFile cvFile;
}
