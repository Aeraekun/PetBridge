package site.petbridge.domain.report.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.petbridge.domain.report.domain.Report;
import site.petbridge.domain.report.domain.enums.ReportType;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReportRegistRequestDto {

    @NotNull
    private ReportType reportType;
    @NotNull
    private int reportId;
    @NotNull
    private String reason;

    public Report toEntity(int userId) {
        return Report.builder()
                    .userId(userId)
                    .reportType(reportType)
                    .reportId(reportId)
                    .reason(reason)
                    .build();
    }
}
