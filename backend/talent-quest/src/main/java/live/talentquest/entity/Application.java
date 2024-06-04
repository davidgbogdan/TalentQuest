package live.talentquest.entity;

import jakarta.persistence.*;
import live.talentquest.enums.ApplicationStatus;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "applications")
public class Application {

    @Id
    @GeneratedValue
    private Long id;

    @Column
    @Builder.Default
    private ApplicationStatus status = ApplicationStatus.IN_REVIEW;

    @ManyToOne
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private JobSeeker jobSeeker;

    @ManyToOne
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Job job;
}
