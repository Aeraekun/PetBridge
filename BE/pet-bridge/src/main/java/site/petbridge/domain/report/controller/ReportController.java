package site.petbridge.domain.report.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.petbridge.domain.report.domain.enums.ReportType;
import site.petbridge.domain.report.dto.request.ReportRegistRequestDto;
import site.petbridge.domain.report.dto.response.ReportResponseDto;
import site.petbridge.domain.report.service.ReportService;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/reports")
public class ReportController {

    private final ReportService reportService;

    /**
     * 신고 등록(USER만)
     */
    @PostMapping
    public ResponseEntity<Void> registReport(@Valid @RequestBody ReportRegistRequestDto reportRegistRequestDto) throws Exception {
        reportService.registReport(reportRegistRequestDto);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    /**
     * 신고 목록 조회(ADMIN만)
     */
    @GetMapping
    public ResponseEntity<List<ReportResponseDto>> getListReport(@RequestParam(name = "page") int page,
                                                                 @RequestParam(name = "size") int size,
                                                                 @RequestParam(name = "reporttype", required = false)
                                                                     ReportType reportType) throws Exception {
        List<ReportResponseDto> reportResponseDtos = reportService.getListReport(page,size,reportType);

        return Optional.ofNullable(reportResponseDtos)
                .filter(list -> !list.isEmpty())
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.noContent().build());
    }

    /**
     * 신고 상태 수정, 확인(ADMIN만)
     */
    @PatchMapping("/{id}")
    public ResponseEntity<Void> editReportConfirm(@PathVariable("id") int id) throws Exception {
        reportService.editReportConfirm(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
