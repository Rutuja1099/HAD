package com.example.had_backend_jwt.Models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PatientDetailDTO {
    private String fullname;
//    private String gender;
//    private String phone;
//    private String dob;
    private List<SeverityWeek> severityWeekWise;
}
