package com.example.had_backend_jwt.Repositories;

import com.example.had_backend_jwt.Entities.PatientInfo;
import com.example.had_backend_jwt.Entities.UpVoteAnswerPatient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UpVoteAnswerPatientRepository extends JpaRepository<UpVoteAnswerPatient, Integer> {
    List<UpVoteAnswerPatient> findUpVoteAnswerPatientByPatientInfo(PatientInfo patientInfo);
}
