package com.example.had_backend_jwt.Entities;

import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@Builder
@Entity
@Data
@Table(name = "questionnaire")
public class Questionnaire {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "questionId")
    private Integer questionId;

    @Column(name = "question",nullable = false, unique = true)
    private String question;

    @Column(name="weekNum", nullable = false)
    private Integer weekNum;

    @Column(name = "opt1",nullable = false)
    private Integer opt1;

    @Column(name = "opt2",nullable = false)
    private Integer opt2;

    @Column(name = "opt3",nullable = false)
    private Integer opt3;

    @Column(name = "opt4",nullable = false)
    private Integer opt4;

    public Questionnaire(Integer questionId, String question, Integer weekNum, Integer opt1, Integer opt2, Integer opt3, Integer opt4) {
        this.questionId = questionId;
        this.question = question;
        this.weekNum = weekNum;
        this.opt1 = opt1;
        this.opt2 = opt2;
        this.opt3 = opt3;
        this.opt4 = opt4;
    }

    public Questionnaire() {
    }
}
