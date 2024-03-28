package com.example.had_backend_jwt.Entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="patientProgress")
public class PatientProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="patientProgressId")
    private int patientProgressId;

//    @Column(name="ptRegNo")
//    private String ptRegNo;

    @Column(name="currentWeek")
    private int currentWeek;

    @Column(name="severity")
    private int severity;

    @Column(name = "severityType")
    private String severityType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ptRegNo")
    private PatientInfo patientInfo;
}
