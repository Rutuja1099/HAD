package com.example.had_backend_jwt.Services;

import com.example.had_backend_jwt.Entities.AdminLogin;
import com.example.had_backend_jwt.Entities.PatientLogin;
import com.example.had_backend_jwt.JWT.JwtService;
import com.example.had_backend_jwt.Models.AuthenticationRequest;
import com.example.had_backend_jwt.Models.AuthenticationResponse;
import com.example.had_backend_jwt.Models.PatientAuthenticationResponse;
import com.example.had_backend_jwt.Repositories.AdminLoginRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminAuthenticationService {
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final AdminLoginRepository adminRepository;
    public AuthenticationResponse authenticateAdmin(AuthenticationRequest request) {
        try{
//            authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(
//                            request.getUsername(),
//                            request.getPassword()
//                    )
//            );
            AdminLogin adminLogin=adminRepository.findByAdminUsername(request.getUsername())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            if(!passwordEncoder.matches(request.getPassword(), adminLogin.getAdminPassword())) {
                return AuthenticationResponse.builder()
                        .message("Invalid username or password")
                        .build();
            }

            var jwtToken=jwtService.generateToken(adminLogin);

            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .message("Success")
                    .build();
        }catch (AuthenticationException e) {
            // Authentication failed, handle the exception
            return AuthenticationResponse.builder()
                    .message("Invalid username or password")
                    .build();
        }
    }

    public AdminLogin registerAdmin(AdminLogin request) {
        PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();
        System.out.println("Inside service page");
        AdminLogin adminLogin= AdminLogin.builder()
                .adminEmail(request.getAdminEmail())
                .adminUsername(request.getAdminUsername())
                .adminPassword(passwordEncoder.encode(request.getAdminPassword()))
                .build();
        adminRepository.save(adminLogin);
        return adminLogin;
    }
}
