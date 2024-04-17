package com.example.had_backend_jwt.Repositories;

import com.example.had_backend_jwt.Entities.PatientProgress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PatientProgressRepository extends JpaRepository<PatientProgress, Integer> {
    Optional<PatientProgress> findFirstByPatientInfoPtRegNoOrderByCurrentWeekDescCurrentDayDesc(Integer ptRegNo);
}
