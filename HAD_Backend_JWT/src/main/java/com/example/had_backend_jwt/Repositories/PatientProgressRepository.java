package com.example.had_backend_jwt.Repositories;

import com.example.had_backend_jwt.Entities.PatientInfo;
import com.example.had_backend_jwt.Entities.PatientProgress;
import com.example.had_backend_jwt.Models.WeekWiseSeverity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PatientProgressRepository extends JpaRepository<PatientProgress, Integer> {
    Optional<PatientProgress> findFirstByPatientInfoPtRegNoOrderByCurrentWeekDescCurrentDayDesc(Integer ptRegNo);

//    @Query("select AVG(p.severity) as avgSeverity from patientprogress p "+
//            "where p.patientInfo.ptRegNo = :ptRegNo "+
//            "group by p.")
    List<PatientProgress> findByPatientInfo(PatientInfo patientInfo);

    @Query("SELECT p.currentWeek as week, AVG(p.severity) as avgSeverity FROM PatientProgress p " +
            "WHERE p.patientInfo.ptRegNo = :ptRegNo " +
            "GROUP BY p.currentWeek " +
            "ORDER BY p.currentWeek DESC LIMIT 7")
    List<WeekWiseSeverity> findAverageSeverityByPatientInfoPtRegNoOrderByWeekDesc(int ptRegNo);

//    @Query("select avg(p.severity) as avgSeverity, p.patientInfo.ptRegNo from PatientProgress p group by p.patientInfo.ptRegNo")
//    List<Object[]> findAverageSeverityByPatientInfo();
//    @Query("SELECT AVG(p.severity) as avgSeverity, p.patientInfo.ptRegNo FROM PatientProgress p WHERE p.patientInfo = :patientInfo GROUP BY p.patientInfo.ptRegNo")
//    Object[] findAverageSeverityByPatientInfo(@Param("patientInfo") PatientInfo patientInfo);
    @Query("SELECT AVG(p.severity) as avgSeverity, p.patientInfo FROM PatientProgress p GROUP BY p.patientInfo.ptRegNo")
    List<Object[]> findAverageSeverityByPatientInfo();



}
