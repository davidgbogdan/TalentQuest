package live.talentquest.entity;

import jakarta.persistence.*;
import live.talentquest.enums.ApplicationStatus;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private ApplicationStatus applicationStatus;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @ManyToOne
    private Candidate candidate;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @ManyToOne
    private Job job;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @OneToOne(mappedBy = "application", cascade = CascadeType.ALL)
    private CV cv;

    @Column(nullable = false)
    private double matchScore;
}
