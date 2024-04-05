package com.example.had_backend_jwt.Repositories;

import com.example.had_backend_jwt.Entities.Questionnaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

//public interface PatientLoginRepository extends JpaRepository
public interface QuestionnaireRepository extends JpaRepository<Questionnaire, Integer> {
    @Query(value = "SELECT * FROM questionnaire ORDER BY RAND() LIMIT 5;",nativeQuery = true)
    List<Questionnaire> findQuestionnaireBySeverity();
}
