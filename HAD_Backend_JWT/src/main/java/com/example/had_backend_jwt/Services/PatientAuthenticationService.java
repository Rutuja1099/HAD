package com.example.had_backend_jwt.Services;

import com.example.had_backend_jwt.Entities.PatientInfo;
import com.example.had_backend_jwt.Entities.PatientLogin;
import com.example.had_backend_jwt.JWT.JwtService;
import com.example.had_backend_jwt.Models.AuthenticationRequest;
import com.example.had_backend_jwt.Models.PatientAuthenticationResponse;
import com.example.had_backend_jwt.Models.PatientRegisterRequest;
import com.example.had_backend_jwt.Repositories.PatientInfoRepository;
import com.example.had_backend_jwt.Repositories.PatientLoginRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class PatientAuthenticationService {
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final PatientLoginRepository patientLoginRepository;
    private final PatientInfoRepository patientInfoRepository;
    private final AuthenticationManager authenticationManager;
    @Autowired
    private EmailService emailService;
    public PatientAuthenticationResponse registerPatient(PatientRegisterRequest request){
        PatientInfo patientInfo = PatientInfo.builder()
                .ptFullname(request.getPtFullname())
                .ptPhone(request.getPtPhone())
                .ptAddr(request.getPtAddr())
                .ptDOB(request.getPtDOB())
                .ptGender(request.getPtGender())
                .build();

        // Save PatientInfo
        patientInfoRepository.save(patientInfo);

        // Create PatientLogin
        PatientLogin patientLogin = PatientLogin.builder()
                .ptUsername(request.getPtUsername())  // Assuming you have a username field in PatientRegisterRequest
                .ptPassword(passwordEncoder.encode(request.getPtPassword()))  // Encode password
                .ptEmail(request.getPtEmail())
                .build();
        patientLogin.setPtInfo(patientInfo);
        // Save PatientLogin
        patientLoginRepository.save(patientLogin);

         //Generate JWT token
        String jwtToken = jwtService.generateToken(patientLogin);

        return PatientAuthenticationResponse.builder()
                .token(jwtToken)
                .patientInfo(patientInfo)
                .build();
    }

    public PatientAuthenticationResponse authenticatePatient(AuthenticationRequest request) {
        try{
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );
            PatientLogin patientLogin = patientLoginRepository.findByPtUsername(request.getUsername())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            PatientInfo patientInfo = patientLogin.getPtInfo();
            var jwtToken=jwtService.generateToken(patientLogin);

            return PatientAuthenticationResponse.builder()
                    .token(jwtToken)
                    .patientInfo(patientInfo)
                    .build();
        }catch (AuthenticationException e) {
            // Authentication failed, handle the exception
            throw new BadCredentialsException("Invalid username or password", e);
        }
    }

    public boolean sendMail(String mail) {
        PatientLogin user=patientLoginRepository.findByPtEmail(mail);
        if(user!=null)
        {
            emailService.sendSimpleMessage(user.getPtEmail(), "Dear User your Username and password is","Username : "+user.getPtUsername()+" \nPassword : "+user.getPtPassword());
            return true;
        }
        return false;
    }
}
