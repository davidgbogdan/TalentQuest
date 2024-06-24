package live.talentquest.entity;

import jakarta.persistence.*;
import live.talentquest.enums.JobType;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "job")
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name = "name", unique = true)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(nullable = false, name = "location")
    private String location;

    @Column(nullable = false, name = "company_name")
    private String companyName;

    @Column(nullable = false, name = "salary")
    private Double salary;

    @Column(nullable = false, name = "type")
    private JobType type;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @OneToMany(
            cascade = {CascadeType.PERSIST, CascadeType.MERGE},
            fetch = FetchType.EAGER,
            mappedBy = "job"
    )
    private Set<Application> applications = new HashSet<>();


    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @ManyToOne
    private Recruiter recruiter;
}
