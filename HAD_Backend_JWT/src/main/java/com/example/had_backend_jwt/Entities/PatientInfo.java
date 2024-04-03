package com.example.had_backend_jwt.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Cascade;

import java.sql.Date;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Data
@Table(name = "patientInfo")
public class PatientInfo {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name="ptRegNo")
//    private Integer ptRegNo;
//    @Column(name="ptFullname",nullable = false)
//    private String ptFullname;
//    @Column(name="ptPhone",length = 10)
//    private String ptPhone;
//    @Column(name="ptAddr",length = 100)
//    private String ptAddr;
//    @Column(name="ptEmail",nullable = false)
//    private String ptEmail;
//    @Column(name="ptDOB")
//    private Date ptDOB;
//    @Column(name="ptGender")
//    private String ptGender;
//
//    @JsonIgnore
//    @OneToOne(mappedBy = "ptInfo")
//    private PatientLogin ptLogin;
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
@Column(name = "ptRegNo")
    private Integer ptRegNo;

    @Column(name = "ptFullname", nullable = false, length = 50)
    private String ptFullname;

    @Column(name = "ptPhone", nullable = false, length = 10)
    private String ptPhone;

    @Column(name = "ptAddr", nullable = false, length = 100)
    private String ptAddr;

    @Column(name = "ptDOB", nullable = false, length = 255)
    private String ptDOB;

    @Column(name = "ptGender", nullable = false)
    private String ptGender;

    @OneToOne(mappedBy = "ptInfo",cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonBackReference
    private PatientLogin ptLogin;

    @OneToMany(mappedBy = "patientInfo", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<PatientProgress> patientProgress;

    @OneToMany(mappedBy = "ptInfo", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Appointments> appointments;
}
