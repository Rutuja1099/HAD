package com.example.had_backend_jwt.Repositories;

import com.example.had_backend_jwt.Entities.PatientInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface PatientInfoRepository extends JpaRepository<PatientInfo,Integer> {
    Optional<PatientInfo> findByPtRegNo(@Param("ptRegNo") Integer ptRegNo);
    PatientInfo findPatientInfoByPtRegNo(int id);
}
