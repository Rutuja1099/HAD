package com.example.had_backend_jwt.Controllers;

import com.example.had_backend_jwt.Models.AuthenticationResponse;
import com.example.had_backend_jwt.Models.DoctorRegisterRequest;
import com.example.had_backend_jwt.Services.AdminAuthenticationService;
import com.example.had_backend_jwt.Services.DoctorAuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/suhrud")
public class AdminController {

    private final DoctorAuthenticationService doctorAuthService;
    private final AdminAuthenticationService adminAuthService;

    @PostMapping("/register/doctor")
    @PreAuthorize("hasAuthority('Admin')")
    public ResponseEntity<AuthenticationResponse> registerDoctor(@RequestBody DoctorRegisterRequest request){
        AuthenticationResponse response=doctorAuthService.registerDoctor(request);
        if(response.getMessage()!=null && !response.getMessage().equals("Success"))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        else
            return ResponseEntity.ok(response);
    }
}
