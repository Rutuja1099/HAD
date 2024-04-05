package com.example.had_backend_jwt.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.had_backend_jwt.Entities.DoctorPatientMapping;

import java.util.Optional;

public interface DoctorPatientMappingRepository extends JpaRepository<DoctorPatientMapping,Integer> {
    Optional<DoctorPatientMapping> findByPatientInfoPtRegNoAndDoctorInfo_DrId(Integer ptRegNo, Integer drId);
}
