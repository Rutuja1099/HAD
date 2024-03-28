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
    private int questionId;

    @Column(name = "question",nullable = false, unique = true)
    private String question;

    @Column(name = "severity",nullable = false)
    private int severity;

    @Column(name = "opt1",nullable = false)
    private int opt1;

    @Column(name = "opt2",nullable = false)
    private int opt2;

    @Column(name = "opt3",nullable = false)
    private int opt3;

    @Column(name = "opt4",nullable = false)
    private int opt4;

    public Questionnaire(int questionId, String question, int severity, int opt1, int opt2, int opt3, int opt4) {
        this.questionId = questionId;
        this.question = question;
        this.severity = severity;
        this.opt1 = opt1;
        this.opt2 = opt2;
        this.opt3 = opt3;
        this.opt4 = opt4;
    }

    public Questionnaire() {
    }
}
