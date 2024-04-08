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
public class AppointmentBookingRequest {
    private String requestedDate;
    private Integer requestedSlots;
    private Integer drId;
}
