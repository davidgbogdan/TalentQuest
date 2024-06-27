package live.talentquest.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.Optional;

@NoRepositoryBean
public interface UserRepository<T, Long> extends JpaRepository<T, Long> {
    Optional<T> findByEmail(String username);
}
