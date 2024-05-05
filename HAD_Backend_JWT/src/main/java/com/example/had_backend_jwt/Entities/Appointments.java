package com.example.had_backend_jwt.Entities;

import com.example.had_backend_jwt.Configurations.AttributeEncryptor;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import lombok.*;
import jakarta.persistence.*;

import java.sql.Date;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name="appointments")
public class Appointments {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="appointmentId")
    private Integer appointmentId;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ptRegNo")
    private PatientInfo patientInfo;


    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "drId")
    private DoctorInfo drInfo;

    @Column(name="date")
    private Date date;

    @Column(name="timestamp")
    private String timestamp;

    @Column(name="slot")
    private Integer slot;


}
