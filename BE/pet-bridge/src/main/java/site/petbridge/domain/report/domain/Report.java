package site.petbridge.domain.report.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.petbridge.domain.report.domain.enums.ReportType;

import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "reports")
@NoArgsConstructor(access =  AccessLevel.PROTECTED)
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "report_type")
    @Enumerated(EnumType.STRING)
    private ReportType reportType;

    @Column(name = "report_id")
    private int reportId;

    private String reason;

    @Column(name = "report_date")
    private LocalDateTime reportDate = LocalDateTime.now();

    private boolean confirmed = false;

    @Builder
    public Report(int userId, int reportId, ReportType reportType, String reason) {
        this.userId = userId;
        this.reportId = reportId;
        this.reportType = reportType;
        this.reason = reason;
    }

    public void confirm() {
        this.confirmed = true;
    }
}
