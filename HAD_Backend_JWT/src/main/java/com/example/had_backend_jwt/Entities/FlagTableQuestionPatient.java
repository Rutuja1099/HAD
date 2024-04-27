package com.example.had_backend_jwt.Entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "flagTableQuestionPatient")
public class FlagTableQuestionPatient {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "flagId")
    private Integer flagId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "queryId", nullable = false)
    private Questions question;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ptRegNo")
    private PatientInfo patientInfo;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "drId")
//    private DoctorInfo doctorInfo;

}
