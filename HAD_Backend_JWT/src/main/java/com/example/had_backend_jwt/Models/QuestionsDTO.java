package com.example.had_backend_jwt.Models;

import com.example.had_backend_jwt.Entities.Answers;
import com.example.had_backend_jwt.Entities.PatientInfo;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.context.annotation.Bean;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class QuestionsDTO {
    private Integer queryId;

    private String queryContent;

    private Boolean isUrgent=false;

    private Integer flagCount=0;

//    private List<Answers> answers;
    private Integer countAns;
    private boolean isFlagged=false;

}
