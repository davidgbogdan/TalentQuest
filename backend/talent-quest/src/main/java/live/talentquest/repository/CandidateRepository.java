package live.talentquest.repository;

import live.talentquest.entity.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CandidateRepository extends UserRepository<Candidate, Long> {
}
