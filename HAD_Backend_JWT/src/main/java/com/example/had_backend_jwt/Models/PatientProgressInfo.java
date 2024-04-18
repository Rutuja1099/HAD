package com.example.had_backend_jwt.Models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PatientProgressInfo {
    private String ptFullname;
    private int currentWeek;
    private int currentDay;
    private int severity;
    private int totalSeverity;
    private Integer ptRegNo;
}
