package com.example.had_backend_jwt.Repositories;

import com.example.had_backend_jwt.Entities.DoctorInfo;
import com.example.had_backend_jwt.Entities.FlagTableAnswerDoctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FlagTableAnswerDoctorRepository extends JpaRepository<FlagTableAnswerDoctor,Integer> {
    List<FlagTableAnswerDoctor> findByDoctorInfo(DoctorInfo doctorInfo);
//    List<>
}
