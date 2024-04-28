package com.example.had_backend_jwt.Models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DoctorAppointmentsResponse {
    private String ptFullName;
    private String Date;
    private Integer slot;
//    private String ptPhone;
//    private String ptGender;
    private String ptEmail;
    //private String ptAddress;
    private Integer ptRegNo;
}
