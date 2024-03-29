package com.example.had_backend_jwt.Repositories;

import com.example.had_backend_jwt.Entities.Questionnaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

//public interface PatientLoginRepository extends JpaRepository
public interface QuestionnaireRepository extends JpaRepository<Questionnaire, Integer> {
    @Query(value = "select * from questionnaire where severity = :value order by rand() limit 1",nativeQuery = true)
    Questionnaire findQuestionnaireBySeverity(@Param("value") int value);
}
