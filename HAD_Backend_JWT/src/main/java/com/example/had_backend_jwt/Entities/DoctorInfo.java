package com.example.had_backend_jwt.Entities;

import com.example.had_backend_jwt.Configurations.AttributeEncryptor;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name="doctorInfo")
public class DoctorInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="drId")
    private Integer drId;

    @Convert(converter = AttributeEncryptor.class)
    @Column(name = "drRegNo",nullable = false,unique = true)
    private String drRegNo;

    @Convert(converter = AttributeEncryptor.class)
    @Column(name="drFullName",nullable = false, length = 100)
    private String drFullName;

    @Convert(converter = AttributeEncryptor.class)
    @Column(name="drPhone",nullable = false,unique = true,  length = 50)
    private String drPhone;

    @Convert(converter = AttributeEncryptor.class)
    @Column(name = "drAddr",nullable = false, length = 500)
    private String drAddr;

    @Column(name="drSpecialization",nullable = false)
    private String drSpecialization;

    @Column(name="drExperience",nullable = false)
    private Integer drExperience;

    @Column(name = "drPatientLimit",nullable = false)
    private Integer drPatientLimit;

    @Column(name = "drActivePatients",nullable = false)
    private Integer drActivePatients;

    @Column(name="drIsModerator",nullable = false)
    private boolean drIsModerator;

    @Column(name="drGender",nullable = false)
    private String drGender;

    @Column(name="drDegree",nullable = false)
    private String drDegree;

    @Column(name="isDeactivated")
    private Boolean isDeactivated;

    @JsonIgnore
    @OneToOne(mappedBy = "drInfo", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JsonBackReference
    private DoctorLogin drLogin;

    @JsonIgnore
    @OneToMany(mappedBy="doctorInfo",cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonBackReference
    List<DoctorPatientMapping> user;

    @JsonIgnore
    @OneToMany(mappedBy="drInfo", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonBackReference
    List<Answers> answers;

    @JsonIgnore
    @OneToMany(mappedBy="drInfo", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonBackReference
    List<Appointments> appointments;

    @OneToMany(mappedBy = "doctorInfo",fetch = FetchType.LAZY)
    private List<FlagTableQuestionDoctor> flagTableQuestionDoctorList;

    @OneToMany(mappedBy = "doctorInfo",fetch = FetchType.LAZY)
    private List<FlagTableAnswerDoctor> flagTableAnswerDoctorList;
}
