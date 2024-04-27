package com.example.had_backend_jwt.Entities;

import com.example.had_backend_jwt.Configurations.AttributeEncryptor;
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

    @Column(name="currentWeek")
    private int currentWeek;

    @Column(name="currentDay")
    private int currentDay;

    @Convert(converter = AttributeEncryptor.class)
    @Column(name="severity")
    private int severity;

    @Convert(converter = AttributeEncryptor.class)
    @Column(name = "severityType")
    private String severityType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ptRegNo")
    private PatientInfo patientInfo;

    @Convert(converter = AttributeEncryptor.class)
    @Column(name="totalSeverity")
    private int totalSeverity;
}
