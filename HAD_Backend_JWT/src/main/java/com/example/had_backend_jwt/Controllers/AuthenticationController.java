package com.example.had_backend_jwt.Controllers;

import com.example.had_backend_jwt.Models.*;
import com.example.had_backend_jwt.Services.AdminAuthenticationService;
import com.example.had_backend_jwt.Services.DoctorAuthenticationService;
import com.example.had_backend_jwt.Services.PatientAuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final PatientAuthenticationService patientAuthService;
    private final DoctorAuthenticationService doctorAuthService;
    private final AdminAuthenticationService adminAuthService;

    @PostMapping("/register/patient")
    public ResponseEntity<PatientAuthenticationResponse> registerPatient(@RequestBody PatientRegisterRequest request){
        PatientAuthenticationResponse response = patientAuthService.registerPatient(request);
        if (response.getMessage() != null && !response.getMessage().equals("Success"))
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        else
            return ResponseEntity.ok(response);
    }

    @PostMapping("/login/patient")
    public ResponseEntity<PatientAuthenticationResponse> authenticatePatient( @RequestBody AuthenticationRequest request){
        PatientAuthenticationResponse response = patientAuthService.authenticatePatient(request);
        if (response.getMessage() != null && !response.getMessage().equals("Success"))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        else
            return ResponseEntity.ok(response);
    }


    @PostMapping("/login/doctor")
    public ResponseEntity<DoctorAuthenticationResponse> authenticateDoctor( @RequestBody AuthenticationRequest request){
        DoctorAuthenticationResponse response=doctorAuthService.authenticateDoctor(request);
        if(response.getMessage()!=null && !response.getMessage().equals("Success"))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        else
            return ResponseEntity.ok(response);
    }

    @PostMapping("/email/patient")
    public ResponseEntity<?> sendEmail(@RequestParam String mail)
    {
        boolean sent=patientAuthService.sendMail(mail);
        if(sent){
            return ResponseEntity.ok("Mail Sent Successfully");
        }
        return ResponseEntity.badRequest().body("Email not in Database");
    }

   @PostMapping("/login/admin")
    public ResponseEntity<AdminAuthenticationResponse> authenticateAdmin( @RequestBody AuthenticationRequest request){
        AdminAuthenticationResponse response=adminAuthService.authenticateAdmin(request);
        if(response.getMessage()!=null && !response.getMessage().equals("Success"))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        else
            return ResponseEntity.ok(response);
    }

    @PostMapping("/doctor/passwordUpdation/firstTime")
    public ResponseEntity<DoctorAuthenticationResponse> doctorPasswordUpdationFirstTime(@RequestBody PasswordUpdateRequest request){
        DoctorAuthenticationResponse response=doctorAuthService.doctorPasswordUpdationFirstTime(request);
        if(response.getMessage()!=null && !response.getMessage().equals("Success"))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        else
            return ResponseEntity.ok(response);
    }

//    @PostMapping("/register/admin")
//    public ResponseEntity<AdminLogin> registerAdmin(@RequestBody AdminLogin request){
//        return ResponseEntity.ok(adminAuthService.registerAdmin(request));
//    }

}
