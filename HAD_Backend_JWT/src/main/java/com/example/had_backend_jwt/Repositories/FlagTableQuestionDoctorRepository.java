package com.example.had_backend_jwt.Repositories;

import com.example.had_backend_jwt.Entities.DoctorInfo;
import com.example.had_backend_jwt.Entities.FlagTableQuestionDoctor;
import com.example.had_backend_jwt.Entities.Questions;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface FlagTableQuestionDoctorRepository extends JpaRepository<FlagTableQuestionDoctor,Integer> {
    List<FlagTableQuestionDoctor> findByDoctorInfo(DoctorInfo drInfo);
}
