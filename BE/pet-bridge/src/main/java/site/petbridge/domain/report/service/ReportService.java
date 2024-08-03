package site.petbridge.domain.report.service;

import site.petbridge.domain.report.domain.enums.ReportType;
import site.petbridge.domain.report.dto.request.ReportRegistRequestDto;
import site.petbridge.domain.report.dto.response.ReportResponseDto;
import java.util.List;

public interface ReportService {

    /**
     * 신고 등록
     */
    void registReport(ReportRegistRequestDto reportRegistRequestDto) throws Exception;

    /**
     * 신고 목록 조회(관리자)
     */
    List<ReportResponseDto> getListReport(int page, int size, ReportType reportType) throws Exception;

    /**
     * 신고 확인(관리자)
     */
    void editReportConfirm(int id) throws Exception;
}
