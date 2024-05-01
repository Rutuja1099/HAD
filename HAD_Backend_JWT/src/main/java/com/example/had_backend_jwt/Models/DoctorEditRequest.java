package com.example.had_backend_jwt.Models;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DoctorEditRequest {
    private String drFullName;
    private String drPhone;
    private String drAddr;
    private String drSpecialization;
    private Integer drExperience;
    private Integer drPatientLimit;
    private Integer drActivePatients;
    private String drGender;
    private String drDegree;
}
