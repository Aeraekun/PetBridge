package site.petbridge.domain.report.dto.response;

import lombok.Getter;
import site.petbridge.domain.report.domain.Report;
import site.petbridge.domain.report.domain.enums.ReportType;

import java.time.LocalDateTime;

@Getter
public class ReportResponseDto {
    private int id;
    private int userId;
    private ReportType reportType;
    private int reportId;
    private String reason;
    private LocalDateTime reportDate;
    private boolean confirmed;

    public ReportResponseDto(Report entity) {
        this.id = entity.getId();
        this.userId = entity.getUserId();
        this.reportType = entity.getReportType();
        this.reportId = entity.getReportId();
        this.reason = entity.getReason();
        this.reportDate = entity.getReportDate();
        this.confirmed = entity.isConfirmed();
    }
}
