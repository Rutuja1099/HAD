package com.example.had_backend_jwt.Models;

import lombok.Data;

@Data
public class DoctorInformationDTO {
    private Integer drRegNo;
    private String drFullName;
    private String drPhone;
    private String drAddr;
    private String drSpecialization;
    private Integer drExperience;
    private Integer drPatientLimit;
    private Integer drActivePatients;
    private boolean drIsModerator;
    private String drGender;
    private String drDegree;
}
