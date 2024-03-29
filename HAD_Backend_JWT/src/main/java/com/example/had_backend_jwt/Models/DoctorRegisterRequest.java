package com.example.had_backend_jwt.Models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DoctorRegisterRequest {
    private Integer drRegNo;
    private String drFullName;
    private String drPhone;
    private String drAddr;
    private String drSpecialization;
    private String drEmail;
    private Integer drExperience;
    private Integer drPatientLimit;
    private Integer drActivePatients;
    private boolean drIsModerator;
    private String drGender;
    private String drUsername;
    //private String drPassword;
}
