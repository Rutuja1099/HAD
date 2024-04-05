package com.example.had_backend_jwt.Controllers;

import com.example.had_backend_jwt.Models.DoctorAppointmentsResponse;
import com.example.had_backend_jwt.Services.DoctorService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/suhrud/doctor")
public class DoctorController {
    @Autowired
    private DoctorService doctorService;

    @GetMapping("/viewAppointments/current")
    public ResponseEntity<List<DoctorAppointmentsResponse>> viewCurrentAppointments(HttpServletRequest request){
        return ResponseEntity.ok(doctorService.fetchCurrentAppointments(request));
    }

    @GetMapping("/viewAppointments/upcoming")
    public ResponseEntity<List<DoctorAppointmentsResponse>> viewUpcomingAppointments(HttpServletRequest request){
        return ResponseEntity.ok(doctorService.fetchUpcomingAppointments(request));
    }

    @GetMapping("/viewAppointments/previous")
    public ResponseEntity<List<DoctorAppointmentsResponse>> viewPreviousAppointments(HttpServletRequest request){
        return ResponseEntity.ok(doctorService.fetchPreviousAppointments(request));
    }
}
