package com.example.had_backend_jwt.Models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PatientProfileUpdation {
    private String ptFullname;
    private String ptAddr;
    private String ptDOB;
    private String ptPhone;
    private String ptEmail;
    private String message=null;
}
