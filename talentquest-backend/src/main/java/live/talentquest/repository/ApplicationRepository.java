package live.talentquest.repository;

import live.talentquest.dto.application.ApplicationCountByJobDto;
import live.talentquest.dto.application.ApplicationStatusDistributionDto;
import live.talentquest.entity.Application;
import live.talentquest.entity.Job;
import live.talentquest.enums.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByJob(Job job);

    @Query("SELECT new live.talentquest.dto.application.ApplicationCountByJobDto(j.id, j.name, COUNT(a)) " +
            "FROM Application a JOIN a.job j GROUP BY j.id, j.name")
    List<ApplicationCountByJobDto> countApplicationsByJob();

    @Query("SELECT new live.talentquest.dto.application.ApplicationStatusDistributionDto(a.applicationStatus, COUNT(a)) " +
            "FROM Application a GROUP BY a.applicationStatus")
    List<ApplicationStatusDistributionDto> countApplicationStatusDistribution();
}
