package site.petbridge.domain.report.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import site.petbridge.domain.report.domain.Report;
import site.petbridge.domain.report.domain.enums.ReportType;

import java.util.Optional;

public interface ReportRepository extends JpaRepository<Report, Long> {
    Page<Report> findByReportType(ReportType reportType, Pageable pageable);

    Optional<Report> findByIdAndConfirmedFalse(int id);
}
