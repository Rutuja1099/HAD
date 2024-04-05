package com.example.had_backend_jwt.Models;

import com.example.had_backend_jwt.Entities.Appointments;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookedDaysResponse {
    Map<Integer,Boolean> bookedSlots;
    List<Integer> myBookedSlots;
}
