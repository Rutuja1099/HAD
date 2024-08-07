package com.example.had_backend_jwt.Repositories;

import com.example.had_backend_jwt.Entities.PatientInfo;
import com.example.had_backend_jwt.Entities.PatientLogin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface PatientLoginRepository extends JpaRepository<PatientLogin,Integer> {
    Optional<PatientLogin> findByPtUsername(@Param("ptUsername") String username);
    Optional<PatientLogin> findByPtEmail(@Param("ptEmail") String ptEmail);
    PatientLogin findPatientLoginByPtInfo(PatientInfo patientInfo);

}
