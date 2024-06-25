package live.talentquest.repository;

import live.talentquest.entity.Recruiter;
import org.springframework.stereotype.Repository;

@Repository
public interface RecruiterRepository extends UserRepository<Recruiter, Long> {
}
