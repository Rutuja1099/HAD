package com.example.had_backend_jwt.Repositories;

import com.example.had_backend_jwt.Entities.Answers;
import com.example.had_backend_jwt.Entities.PatientInfo;
import com.example.had_backend_jwt.Entities.Questionnaire;
import com.example.had_backend_jwt.Entities.Questions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface QuestionsRepository extends JpaRepository<Questions, Integer> {
    Optional<Questions> findByQueryId(Integer queryId);

    List<Questions> findQuestionsByPatientInfo(PatientInfo pInfo);

    Questions findQuestionsByQueryId(Integer queryId);

    @Query(value = "SELECT * FROM questions WHERE isDeleted = false",nativeQuery = true)
    List<Questions> QuestionList();

    @Query(value = "SELECT * FROM questions WHERE isDeleted = false ORDER BY flagCount DESC LIMIT 10",nativeQuery = true)
    List<Questions> TrendingQuestionList();

}
