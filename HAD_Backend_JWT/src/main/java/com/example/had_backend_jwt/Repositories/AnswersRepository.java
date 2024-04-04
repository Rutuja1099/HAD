package com.example.had_backend_jwt.Repositories;

import com.example.had_backend_jwt.Entities.Answers;
import com.example.had_backend_jwt.Entities.PatientInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface AnswersRepository extends JpaRepository<Answers, Integer> {

    Optional<Answers> findByAnswerId(@Param("answerId") Integer answerId);

    Answers findAnswersByAnswerId(Integer answerId);
}

