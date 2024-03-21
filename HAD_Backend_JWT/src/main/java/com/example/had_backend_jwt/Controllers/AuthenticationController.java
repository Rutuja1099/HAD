package com.example.had_backend_jwt.Controllers;

import com.example.had_backend_jwt.Models.*;
import com.example.had_backend_jwt.Services.DoctorAuthenticationService;
import com.example.had_backend_jwt.Services.PatientAuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final PatientAuthenticationService patientAuthService;
    private final DoctorAuthenticationService doctorAuthService;

    @PostMapping("/register/patient")
    public ResponseEntity<PatientAuthenticationResponse> registerPatient(@RequestBody PatientRegisterRequest request){
       return ResponseEntity.ok(patientAuthService.registerPatient(request));
    }

    @PostMapping("/login/patient")
    public ResponseEntity<PatientAuthenticationResponse> authenticatePatient( @RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(patientAuthService.authenticatePatient(request));
    }

    @PostMapping("/register/doctor")
    public ResponseEntity<DoctorAuthenticationResponse> registerDoctor(@RequestBody DoctorRegisterRequest request){
        return ResponseEntity.ok(doctorAuthService.registerDoctor(request));
    }

    @PostMapping("/login/doctor")
    public ResponseEntity<DoctorAuthenticationResponse> authenticateDoctor( @RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(doctorAuthService.authenticateDoctor(request));
    }

}
