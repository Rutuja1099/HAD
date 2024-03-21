package com.example.had_backend_jwt.Entities;

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
    @Column(name="drRegno")
    private Integer drRegno;

    @Column(name="drFullName",nullable = false)
    private String drFullName;

    @Column(name="drPhone",nullable = false,unique = true,length = 10)
    private String drPhone;

    @Column(name = "drAddr",nullable = false)
    private String drAddr;

    @Column(name="drEmail",nullable = false,unique = true)
    private String drEmail;

    @Column(name="drExperience")
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
    @OneToOne(mappedBy = "drInfo")
    private DoctorLogin drLogin;
}
