package com.example.had_backend_jwt.Controllers;

import com.example.had_backend_jwt.Models.DoctorAppointmentsResponse;
import com.example.had_backend_jwt.Services.DoctorService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.had_backend_jwt.Models.*;
import com.example.had_backend_jwt.Repositories.DoctorInfoRepository;
import com.example.had_backend_jwt.Services.*;
import com.example.had_backend_jwt.JWT.*;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

import java.util.List;

@RestController
@RequestMapping("/suhrud/doctor")
public class DoctorController {
    @Autowired
    private DoctorService doctorService;
    
    @Autowired
    private pService pService;

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
    
    @GetMapping("/viewSuggestedDoctorsList")
    @PreAuthorize("hasAuthority('Patient')")
    public ResponseEntity<List<SuggestedDoctorsListResponse>> getSuggestedDoctorsListForAppointment(){
        List<SuggestedDoctorsListResponse> DoctorInfos=pService.getSuggestedDoctorsList();
        return  ResponseEntity.ok(DoctorInfos);
    }

    @GetMapping("/getAllDoctorsInfo")
    @PreAuthorize("hasAuthority('Patient')")
    public ResponseEntity<List<DoctorInfo>> getDoctorsList(){
        List<DoctorInfo> DoctorInfos=pService.getAllDoctorsList();
        return  ResponseEntity.ok(DoctorInfos);
    }
}
