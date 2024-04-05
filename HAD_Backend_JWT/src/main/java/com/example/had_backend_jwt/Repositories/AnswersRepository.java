package com.example.had_backend_jwt.Repositories;

import com.example.had_backend_jwt.Entities.Answers;
import com.example.had_backend_jwt.Entities.DoctorInfo;
import com.example.had_backend_jwt.Entities.PatientInfo;
import com.example.had_backend_jwt.Entities.Questions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AnswersRepository extends JpaRepository<Answers, Integer> {

    Optional<Answers> findByAnswerId(Integer answerId);

    Answers findAnswersByAnswerId(Integer answerId);

    List<Answers> findAnswersByQuery(Questions question);

    List<Answers> getAllByOrderByUpVoteDesc();

    List<Answers> findAnswersByDrInfo(DoctorInfo doctorInfo);
}

