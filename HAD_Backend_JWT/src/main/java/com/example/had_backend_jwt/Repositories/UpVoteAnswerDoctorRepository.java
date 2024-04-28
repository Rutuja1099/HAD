package com.example.had_backend_jwt.Repositories;

import com.example.had_backend_jwt.Entities.DoctorInfo;
import com.example.had_backend_jwt.Entities.UpVoteAnswerDoctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UpVoteAnswerDoctorRepository extends JpaRepository<UpVoteAnswerDoctor,Integer> {
    List<UpVoteAnswerDoctor> findByDoctorInfo(DoctorInfo doctorInfo);
}
