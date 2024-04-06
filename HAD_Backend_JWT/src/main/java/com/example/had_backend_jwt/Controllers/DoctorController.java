package com.example.had_backend_jwt.Controllers;

import com.example.had_backend_jwt.Models.DoctorAppointmentsResponse;
import com.example.had_backend_jwt.Services.DoctorService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    @PreAuthorize("hasAuthority('Doctor')")
    public ResponseEntity<List<DoctorAppointmentsResponse>> viewCurrentAppointments(HttpServletRequest request){
        List<DoctorAppointmentsResponse> responses=doctorService.fetchCurrentAppointments(request);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/viewAppointments/upcoming")
    @PreAuthorize("hasAuthority('Doctor')")
    public ResponseEntity<List<DoctorAppointmentsResponse>> viewUpcomingAppointments(HttpServletRequest request){
        List<DoctorAppointmentsResponse> responses=doctorService.fetchUpcomingAppointments(request);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/viewAppointments/previous")
    @PreAuthorize("hasAuthority('Doctor')")
    public ResponseEntity<List<DoctorAppointmentsResponse>> viewPreviousAppointments(HttpServletRequest request){
        List<DoctorAppointmentsResponse> responses=doctorService.fetchPreviousAppointments(request);
        return ResponseEntity.ok(responses);
    }
}
