package com.example.had_backend_jwt.Entities;

import com.example.had_backend_jwt.Configurations.AttributeEncryptor;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Cascade;

import java.sql.Date;
import java.util.List;
import java.util.Set;

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
@Column(name = "ptRegNo")
    private Integer ptRegNo;

    @Convert(converter = AttributeEncryptor.class)
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
    @JsonIgnore
    private PatientLogin ptLogin;

    @OneToMany(mappedBy = "patientInfo", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<PatientProgress> patientProgress;

    @JsonIgnore
    @OneToMany(mappedBy="patientInfo", fetch = FetchType.LAZY)
    @JsonBackReference
    List<DoctorPatientMapping> user;

    @JsonIgnore
    @OneToMany(mappedBy="patientInfo", fetch = FetchType.LAZY)
    @JsonBackReference
    List<Questions> query;

    @JsonIgnore
    @OneToMany(mappedBy="patientInfo", fetch = FetchType.LAZY)
    @JsonBackReference
    List<Appointments> appointments;

    @Column(name="deActivationTimestamp")
    private String deActivationTimestamp;

    @Column(name="isPatientDeActivated")
    private Boolean isPatientDeActivated;

    @OneToMany(mappedBy = "patientInfo",fetch = FetchType.LAZY)
    private List<FlagTableQuestionPatient> flagTableQuestionPatientList;

    @OneToMany(mappedBy = "patientInfo",fetch = FetchType.LAZY)
    private List<FlagTableAnswerPatient> flagTableAnswerPatientList;

    @OneToMany(mappedBy = "patientInfo",fetch = FetchType.LAZY)
    private List<UpVoteAnswerPatient> upVoteAnswerPatientList;

}
