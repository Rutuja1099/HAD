package com.example.had_backend_jwt.Models;

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
    private boolean ptFirstTimeLogin;
    private String message;
    private String ptUsername;
}
