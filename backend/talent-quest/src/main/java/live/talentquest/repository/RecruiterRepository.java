package live.talentquest.repository;

import live.talentquest.entity.Recruiter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecruiterRepository extends JpaRepository<Recruiter, String> {

    Recruiter findByEmail(String email);

    @Query("SELECT r FROM Recruiter r WHERE r.phone = :phone")
    Recruiter findByPhone(@Param("phone") String phone);

    @Query("SELECT r FROM Recruiter r WHERE r.firstName = :firstName AND r.lastName = :lastName")
    List<Recruiter> findByFirstAndLastName(@Param("firstName") String firstName, @Param("lastName") String lastName);
}
