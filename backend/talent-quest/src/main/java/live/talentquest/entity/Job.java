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
@Builder
@Table(name = "jobs")
public class Job {
    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false, name = "title")
    private String title;

    @Column(nullable = false, name = "description")
    private String description;

    @Column(nullable = false, name = "location")
    private String location;

    @Column(nullable = false, name = "type")
    private JobType type;

    @Column(nullable = false, name = "company_name")
    private String companyName;

    @Column(nullable = false, name = "industry")
    private String industry;

    @Column(nullable = false, name = "salary")
    private double salary;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @Builder.Default
    @OneToMany(
            cascade = {CascadeType.MERGE, CascadeType.PERSIST},
            fetch = FetchType.EAGER,
            mappedBy = "job",
            orphanRemoval = true
    )
    private Set<Application> applications = new HashSet<>();

    @ManyToOne
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Recruter recruter;
}
