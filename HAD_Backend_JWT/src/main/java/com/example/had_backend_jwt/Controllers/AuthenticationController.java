package com.example.had_backend_jwt.Controllers;

import com.example.had_backend_jwt.Entities.AdminLogin;
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
    public ResponseEntity<AuthenticationResponse> authenticateDoctor( @RequestBody AuthenticationRequest request){
        AuthenticationResponse response=doctorAuthService.authenticateDoctor(request);
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
    public ResponseEntity<AuthenticationResponse> authenticateAdmin( @RequestBody AuthenticationRequest request){
        AuthenticationResponse response=adminAuthService.authenticateAdmin(request);
        if(response.getMessage()!=null && !response.getMessage().equals("Success"))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        else
            return ResponseEntity.ok(response);
    }

    @PostMapping("/forgotPassword/doctor")
    public ResponseEntity<AuthenticationResponse> doctorForgotPassword(@RequestBody PasswordUpdateRequest request){
        AuthenticationResponse response=doctorAuthService.doctorForgotPasswordUpdation(request);
        if(response.getMessage()!=null && !response.getMessage().equals("Success"))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        else
            return ResponseEntity.ok(response);
    }

    @PostMapping("/email/doctor")
    public ResponseEntity<?> doctorSendMail(@RequestParam String mail)
    {
        boolean sent=doctorAuthService.drForgotPasswordSendMail(mail);
        if(sent){
            return ResponseEntity.ok("Mail Sent Successfully");
        }
        return ResponseEntity.badRequest().body("Email not in Database");
    }

    @PostMapping("/forgotPassword/patient")
    public ResponseEntity<PatientAuthenticationResponse> patientForgotPassword(@RequestBody PasswordUpdateRequest request){
        PatientAuthenticationResponse response=patientAuthService.patientForgotPasswordUpdation(request);
        if(response.getMessage()!=null && !response.getMessage().equals("Success"))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        else
            return ResponseEntity.ok(response);
    }

    @PostMapping("/register/admin")
    public ResponseEntity<AdminLogin> registerAdmin(@RequestBody AdminLogin request){
        return ResponseEntity.ok(adminAuthService.registerAdmin(request));
    }

}
