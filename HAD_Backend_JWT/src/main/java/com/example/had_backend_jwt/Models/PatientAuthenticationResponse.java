package com.example.had_backend_jwt.Models;

import com.example.had_backend_jwt.Entities.PatientInfo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PatientAuthenticationResponse {
    private String token;
    private PatientInfo patientInfo;
    private String message;
}
