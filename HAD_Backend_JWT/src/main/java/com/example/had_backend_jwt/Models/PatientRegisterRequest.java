package com.example.had_backend_jwt.Models;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PatientRegisterRequest {
    private String ptFullname;
//    private String ptPhone;
//    private String ptAddr;
    private String ptEmail;
//    private String ptDOB;
//    private String ptGender;
    private String ptUsername;
    private String ptPassword;
}
