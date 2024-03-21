package com.example.had_backend_jwt.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "patientInfo")
public class PatientInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ptRegNo")
    private Integer ptRegNo;
    @Column(name="ptFullname",nullable = false)
    private String ptFullname;
    @Column(name="ptPhone",length = 10)
    private String ptPhone;
    @Column(name="ptAddr",length = 100)
    private String ptAddr;
    @Column(name="ptEmail",nullable = false)
    private String ptEmail;
    @Column(name="ptDOB")
    private Date ptDOB;
    @Column(name="ptGender")
    private String ptGender;

    @JsonIgnore
    @OneToOne(mappedBy = "ptInfo")
    private PatientLogin ptLogin;
}
