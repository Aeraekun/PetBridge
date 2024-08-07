package site.petbridge.domain.report.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import site.petbridge.domain.board.domain.Board;
import site.petbridge.domain.board.repository.BoardRepository;
import site.petbridge.domain.petpick.domain.PetPick;
import site.petbridge.domain.petpick.repository.PetPickRepository;
import site.petbridge.domain.report.domain.Report;
import site.petbridge.domain.report.domain.enums.ReportType;
import site.petbridge.domain.report.dto.request.ReportRegistRequestDto;
import site.petbridge.domain.report.dto.response.ReportResponseDto;
import site.petbridge.domain.report.repository.ReportRepository;
import site.petbridge.domain.user.domain.User;
import site.petbridge.domain.user.domain.enums.Role;
import site.petbridge.domain.user.repository.UserRepository;
import site.petbridge.global.exception.ErrorCode;
import site.petbridge.global.exception.PetBridgeException;
import site.petbridge.global.login.userdetail.CustomUserDetail;
import site.petbridge.util.AuthUtil;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final ReportRepository reportRepository;
    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final PetPickRepository petPickRepository;
    private final AuthUtil authUtil;

    @Transactional
    @Override
    public void registReport(ReportRegistRequestDto reportRegistRequestDto) throws Exception {
        User user = authUtil.getAuthenticatedUser();

        if (user.getRole() != Role.USER) {
            throw new PetBridgeException(ErrorCode.FORBIDDEN);
        }

        // 해당 reportType, reportId 신고 대상 존재하지 않는 경우
        if (reportRegistRequestDto.getReportType() == ReportType.USER) {
            User userToReport = userRepository.findByIdAndDisabledFalse(reportRegistRequestDto.getReportId()).orElse(null);
            if (userToReport == null) { throw new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND); }
        } else if (reportRegistRequestDto.getReportType() == ReportType.BOARD) {
            Board boardToReport = boardRepository.findByIdAndDisabledFalse(reportRegistRequestDto.getReportId()).orElse(null);
            if (boardToReport == null) { throw new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND); }
        } else if (reportRegistRequestDto.getReportType() == ReportType.PETPICK) {
            PetPick petPickToReport = petPickRepository.findByIdAndDisabledFalse(reportRegistRequestDto.getReportId()).orElse(null);
            if (petPickToReport == null) { throw new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND); }
        }

        Report entity = reportRegistRequestDto.toEntity(user.getId());
        reportRepository.save(entity);
    }

    @Override
    public List<ReportResponseDto> getListReport(int page, int size, ReportType reportType) throws Exception {

        User user = authUtil.getAuthenticatedUser();
        // ADMIN만
        if (user.getRole() != Role.ADMIN) {
            throw new PetBridgeException(ErrorCode.FORBIDDEN);
        }

        Sort sort = Sort.by(Sort.Direction.DESC, "reportDate");
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Report> reports;
        if (reportType != null) {
            reports = reportRepository.findByReportType(reportType, pageable);
        } else {
            reports = reportRepository.findAll(pageable);
        }

        return reports.stream()
                .map(ReportResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional
    @Override
    public void editReportConfirm(int id) throws Exception {
        User user = authUtil.getAuthenticatedUser();
        // ADMIN만
        if (user.getRole() != Role.ADMIN) {
            throw new PetBridgeException(ErrorCode.FORBIDDEN);
        }

        Report report = reportRepository.findByIdAndConfirmedFalse(id)
                .orElseThrow(() -> new PetBridgeException(ErrorCode.RESOURCES_NOT_FOUND));
        report.confirm();

        reportRepository.save(report);
    }
}
