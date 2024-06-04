package live.talentquest.repository;

import live.talentquest.entity.Recruter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecruterRepository extends JpaRepository<Recruter, String> {
}
