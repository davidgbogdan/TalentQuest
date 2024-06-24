package live.talentquest.repository;

import live.talentquest.entity.Recruiter;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RecruiterRepository extends UserRepository<Recruiter, Long> {
}
