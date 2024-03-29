package com.example.had_backend_jwt.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name="doctorInfo")
public class DoctorInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="drId")
    private Integer drId;

    @Column(name = "drRegNo",nullable = false,unique = true)
    private Integer drRegNo;

    @Column(name="drFullName",nullable = false, length = 50)
    private String drFullName;

    @Column(name="drPhone",nullable = false,unique = true,length = 10)
    private String drPhone;

    @Column(name = "drAddr",nullable = false, length = 100)
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

    @JsonIgnore
    @OneToOne(mappedBy = "drInfo", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JsonBackReference
    private DoctorLogin drLogin;
}
