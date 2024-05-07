package com.example.had_backend_jwt.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "flagTableAnswerPatient")
public class FlagTableAnswerPatient {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "flagId")
    private Integer flagId;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "answerId", nullable = false)
    private Answers answers;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ptRegNo")
    private PatientInfo patientInfo;
}
