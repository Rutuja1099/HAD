package com.example.had_backend_jwt.Repositories;

import com.example.had_backend_jwt.Entities.FlagTableQuestionPatient;
import com.example.had_backend_jwt.Entities.PatientInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FlagTableQuestionPatientRepository extends JpaRepository<FlagTableQuestionPatient,Integer> {
    List<FlagTableQuestionPatient> findByPatientInfo(PatientInfo patientInfo);
}
