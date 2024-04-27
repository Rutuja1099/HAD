package com.example.had_backend_jwt.Models;

import lombok.Data;

@Data
public class DashBoardGraphDTO {
    private String severity;
    private int count;

    public DashBoardGraphDTO(String severity, int count) {
        this.severity = severity;
        this.count = count;
    }
}
