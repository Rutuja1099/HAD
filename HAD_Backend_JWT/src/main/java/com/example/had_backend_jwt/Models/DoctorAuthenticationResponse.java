package com.example.had_backend_jwt.Models;

import com.example.had_backend_jwt.Entities.DoctorInfo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DoctorAuthenticationResponse {
    private String token;
    private DoctorInfo doctorInfo;
}
