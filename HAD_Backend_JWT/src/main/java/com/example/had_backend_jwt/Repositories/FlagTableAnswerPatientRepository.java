package com.example.had_backend_jwt.Repositories;

import com.example.had_backend_jwt.Entities.Answers;
import com.example.had_backend_jwt.Entities.FlagTableAnswerPatient;
import com.example.had_backend_jwt.Entities.PatientInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FlagTableAnswerPatientRepository extends JpaRepository<FlagTableAnswerPatient,Integer> {
    List<FlagTableAnswerPatient> findByPatientInfo(PatientInfo patientInfo);
    List<FlagTableAnswerPatient> findByAnswersAndPatientInfo(PatientInfo patientInfo, Answers answers);
}
