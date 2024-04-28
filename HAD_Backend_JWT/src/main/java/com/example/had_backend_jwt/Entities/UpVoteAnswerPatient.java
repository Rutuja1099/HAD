package com.example.had_backend_jwt.Entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "upVoteAnswerPatient")
public class UpVoteAnswerPatient {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "upVoteId")
    private Integer upVoteId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "answerId", nullable = false)
    private Answers answers;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ptRegNo")
    private PatientInfo patientInfo;
}

