package live.talentquest.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "job_seekers")
public class JobSeeker {
    @Id
    @Column(nullable = false, name = "username")
    private String username;

    @Column(nullable = false, name = "password")
    private String password;

    @Column(nullable = false, name = "first_name")
    private String firstName;

    @Column(nullable = false, name = "last_name")
    private String lastName;

    @Column(nullable = false, name = "phone")
    private String phone;

    @Column(nullable = false, name = "email")
    private String email;


    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @Builder.Default
    @OneToMany(
            fetch = FetchType.EAGER,
            mappedBy = "job_seekers",
            orphanRemoval = true
    )
    private Set<Application> applications = new HashSet<>();

    private void addApplicationToJobSeeker(Application application) {
        applications.add(application);
    }
}
