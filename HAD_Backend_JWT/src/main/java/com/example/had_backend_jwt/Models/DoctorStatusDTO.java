package com.example.had_backend_jwt.Models;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DoctorStatusDTO {

    private Integer drId;

    private String drRegNo;

    private String drFullName;

    private String drEmail;

    private String drPhone;

    private String drAddr;

    private String drSpecialization;

    private Integer drExperience;

    private Integer drPatientLimit;

    private Integer drActivePatients;

    private boolean drIsModerator;

    private String drGender;

    private String drDegree;

    private boolean isDeactivated;
}
