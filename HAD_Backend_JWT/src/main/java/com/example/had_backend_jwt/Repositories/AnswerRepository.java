package com.example.had_backend_jwt.Repositories;

import com.example.had_backend_jwt.Entities.Answers;
import com.example.had_backend_jwt.Entities.DoctorInfo;
import com.example.had_backend_jwt.Entities.Questions;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answers, Integer> {
    List<Answers> findAnswersByQuery(Questions question);

    List<Answers> getAllByOrderByUpVoteDesc();

    List<Answers> findAnswersByDrInfo(DoctorInfo doctorInfo);
}
