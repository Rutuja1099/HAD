package com.example.had_backend_jwt.Controllers;

import com.example.had_backend_jwt.Models.DoctorAppointmentsResponse;
import com.example.had_backend_jwt.Services.DoctorService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.had_backend_jwt.Models.*;
import com.example.had_backend_jwt.JWT.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/suhrud/doctor")
public class DoctorController {
    @Autowired
    private DoctorService doctorService;

    @Autowired
    private final JwtService jwtService;

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

    @GetMapping("/viewPatients/fetchPatientProgressInfo")
    @PreAuthorize("hasAuthority('Doctor')")
    public ResponseEntity<List<PatientProgressInfo>> fetchPatientProgressInfo(HttpServletRequest request){
        List<PatientProgressInfo> patientProgressInfos=doctorService.fetchPatientProgressInfo(request);
        return ResponseEntity.ok(patientProgressInfos);
    }

    @GetMapping("/viewPatients/fetchPatientProgressInfo/patientDetail")
    @PreAuthorize("hasAuthority('Doctor')")
    public ResponseEntity<PatientDetailDTO> getPatientDetailById(@RequestParam Integer id)
    {
        PatientDetailDTO detail=doctorService.getPatientDetailById(id);
        return ResponseEntity.ok(detail);
    }

    @PostMapping("/logout")
    @PreAuthorize("hasAuthority('Doctor')")
    public ResponseEntity<?> logoutUser(HttpServletRequest request){
        jwtService.addToBlacklist(request);
        return ResponseEntity.ok("Successfully logged out");
    }


    @GetMapping("/getDrId")
    @PreAuthorize("hasAuthority('Doctor') or hasAuthority('Moderator')")
    public ResponseEntity<Integer> getDrId(HttpServletRequest request){
        Integer drId= jwtService.extractId(request,"doctorId");
        return ResponseEntity.ok(drId);
    }

}
