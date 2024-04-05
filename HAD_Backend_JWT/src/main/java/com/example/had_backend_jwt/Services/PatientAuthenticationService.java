package com.example.had_backend_jwt.Services;

import com.example.had_backend_jwt.Entities.PatientInfo;
import com.example.had_backend_jwt.Entities.PatientLogin;
import com.example.had_backend_jwt.JWT.JwtService;
import com.example.had_backend_jwt.Models.*;
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

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PatientAuthenticationService {
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final PatientLoginRepository patientLoginRepository;
    private final PatientInfoRepository patientInfoRepository;

    @Autowired
    private final RandomPasswordGenerationService randomPasswordGenerationService;

    @Autowired
    private EmailService emailService;
    public PatientAuthenticationResponse registerPatient(PatientRegisterRequest request){

        try{
            Optional<PatientLogin> patientLoginOptionalUsername=patientLoginRepository.findByPtUsername(request.getPtUsername());
            if(patientLoginOptionalUsername.isPresent()){
                PatientAuthenticationResponse response = new PatientAuthenticationResponse();
                response.setMessage("Username already exists");
                return response;
            }

            Optional<PatientLogin> patientLoginOptionalEmail=patientLoginRepository.findByPtEmail(request.getPtEmail());
            if(patientLoginOptionalEmail.isPresent()){
                PatientAuthenticationResponse response = new PatientAuthenticationResponse();
                response.setMessage("Email already exists");
                return response;
            }

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
                    .ptUsername(request.getPtUsername())
                    .ptPassword(passwordEncoder.encode(request.getPtPassword()))  // Encode password
                    .ptEmail(request.getPtEmail())
                    .ptFirstTimeLogin(true)
                    .build();
            patientLogin.setPtInfo(patientInfo);
            // Save PatientLogin
            patientLoginRepository.save(patientLogin);

            //Generate JWT token
            String jwtToken = jwtService.generateToken(patientLogin);

            return PatientAuthenticationResponse.builder()
                    .token(jwtToken)
                    .ptFirstTimeLogin(patientLogin.getPtFirstTimeLogin())
                    .message("Success")
                    .build();

        }catch(Exception e){
            PatientAuthenticationResponse response = new PatientAuthenticationResponse();
            response.setMessage(e.getMessage());
            return response;
        }

    }

    public PatientAuthenticationResponse authenticatePatient(AuthenticationRequest request) {
        try{
//            authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(
//                            request.getUsername(),
//                            request.getPassword()
//                    )
//            );
            PatientLogin patientLogin = patientLoginRepository.findByPtUsername(request.getUsername())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            if(!passwordEncoder.matches(request.getPassword(), patientLogin.getPtPassword())){
                return PatientAuthenticationResponse.builder()
                        .message("Invalid username or password")
                        .build();
        }

            var jwtToken=jwtService.generateToken(patientLogin);

            return PatientAuthenticationResponse.builder()
                    .token(jwtToken)
                    .ptFirstTimeLogin(patientLogin.getPtFirstTimeLogin())
                    .message("Success")
                    .build();
        }catch (AuthenticationException e) {
            // Authentication failed, handle the exception
            PatientAuthenticationResponse response=new PatientAuthenticationResponse();
            response.setMessage("Invalid username or password");
            return response;
            //throw new BadCredentialsException("Invalid username or password", e);
        }
    }

    public boolean sendMail(String mail) {
        Optional<PatientLogin> patientLoginOptional=patientLoginRepository.findByPtEmail(mail);
        if(patientLoginOptional.isPresent()){
            PatientLogin user=patientLoginOptional.get();
            if(user!=null)
            {
                String password = randomPasswordGenerationService.randomPasswordGeneration();
                user.setPtPassword(password);
                patientLoginRepository.save(user);
                emailService.sendSimpleMessage(user.getPtEmail(), "Dear User your Username and password is","Username : "+user.getPtUsername()+" \nPassword : "+password);
                return true;
            }
        }
        return false;
    }

    public PatientAuthenticationResponse patientForgotPasswordUpdation(PasswordUpdateRequest request){
        try{
            Optional<PatientLogin> patientLoginOptional=patientLoginRepository.findByPtUsername(request.getUsername());
            if(patientLoginOptional.isPresent()){
                PatientLogin patientLogin=patientLoginOptional.get();
                if(patientLogin.getPtPassword().equals(request.getCurrentPassword())){
                    patientLogin.setPtPassword(passwordEncoder.encode(request.getNewPassword()));
                    patientLoginRepository.save(patientLogin);

//                    var jwtToken=jwtService.generateToken(patientLogin);

                    return PatientAuthenticationResponse.builder()
                            .message("Success")
                            .build();

                }
                else
                    return PatientAuthenticationResponse.builder()
                            .message("Invalid Password")
                            .build();
            } else{
                return PatientAuthenticationResponse.builder()
                        .message("Invalid Username")
                        .build();
            }
        }catch (Exception e){
            return PatientAuthenticationResponse.builder()
                    .message("Invalid Username and password")
                    .build();
        }
    }

}
