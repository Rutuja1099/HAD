package com.example.had_backend_jwt.Repositories;

import com.example.had_backend_jwt.Entities.PatientProgress;
import com.example.had_backend_jwt.Models.WeekWiseSeverity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;

public interface PatientProgressRepository extends JpaRepository<PatientProgress, Integer> {
    Optional<PatientProgress> findFirstByPatientInfoPtRegNoOrderByCurrentWeekDescCurrentDayDesc(Integer ptRegNo);

    @Query("SELECT p.currentWeek as week, AVG(p.severity) as avgSeverity FROM PatientProgress p " +
            "WHERE p.patientInfo.ptRegNo = :ptRegNo " +
            "GROUP BY p.currentWeek " +
            "ORDER BY p.currentWeek DESC LIMIT 7")
    List<WeekWiseSeverity> findAverageSeverityByPatientInfoPtRegNoOrderByWeekDesc(int ptRegNo);
}
