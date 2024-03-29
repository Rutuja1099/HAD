package com.example.had_backend_jwt.Services;

import com.example.had_backend_jwt.Entities.DoctorInfo;
import com.example.had_backend_jwt.Entities.DoctorLogin;
import com.example.had_backend_jwt.Entities.PatientLogin;
import com.example.had_backend_jwt.JWT.JwtService;
import com.example.had_backend_jwt.Models.AuthenticationRequest;
import com.example.had_backend_jwt.Models.DoctorAuthenticationResponse;
import com.example.had_backend_jwt.Models.DoctorRegisterRequest;
import com.example.had_backend_jwt.Models.PasswordUpdateRequest;
import com.example.had_backend_jwt.Repositories.DoctorInfoRepository;
import com.example.had_backend_jwt.Repositories.DoctorLoginRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class DoctorAuthenticationService {
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final DoctorInfoRepository doctorInfoRepository;
    private final DoctorLoginRepository doctorLoginRepository;
    private final AuthenticationManager authenticationManager;

    @Autowired
    private final RandomPasswordGenerationService randomPasswordGenerationService;

    @Autowired
    private EmailService emailService;

    public DoctorAuthenticationResponse registerDoctor(DoctorRegisterRequest request){
        try{
            Optional<DoctorLogin> doctorLoginOptionalUsername=doctorLoginRepository.findByDrUsername(request.getDrUsername());
            if(doctorLoginOptionalUsername.isPresent()){
                return DoctorAuthenticationResponse.builder()
                        .message("Username already exists")
                        .build();
            }

            Optional<DoctorLogin> doctorLoginOptionalEmail=doctorLoginRepository.findByDrEmail(request.getDrEmail());
            if(doctorLoginOptionalEmail.isPresent()){
                return DoctorAuthenticationResponse.builder()
                        .message("Email already exists")
                        .build();
            }

            Optional<DoctorInfo> doctorInfoOptional=doctorInfoRepository.findByDrRegNo(request.getDrRegNo());
            if(doctorInfoOptional.isPresent()){
                return DoctorAuthenticationResponse.builder()
                        .message("This Registration Number already exists. Registration Number is unique. Please check!!")
                        .build();
            }

            DoctorInfo doctorInfo=DoctorInfo.builder()
                    .drRegNo(request.getDrRegNo())
                    .drFullName(request.getDrFullName())
                    .drPhone(request.getDrPhone())
                    .drAddr(request.getDrAddr())
                    .drExperience(request.getDrExperience())
                    .drPatientLimit(request.getDrPatientLimit())
                    .drActivePatients(request.getDrActivePatients())
                    .drIsModerator(request.isDrIsModerator())
                    .drGender(request.getDrGender())
                    .drSpecialization(request.getDrSpecialization())
                    .build();

            doctorInfoRepository.save(doctorInfo);
            DoctorLogin doctorLogin=DoctorLogin.builder()
                    .drUsername(request.getDrUsername())
                    .drPassword(randomPasswordGenerationService.randomPasswordGeneration())
                    .drEmail(request.getDrEmail())
                    .drFirstTimeLogin(true)
                    .build();
            doctorLogin.setDrInfo(doctorInfo);

            doctorLoginRepository.save(doctorLogin);

            emailService.sendSimpleMessage(doctorLogin.getDrEmail(), "Dear User your Username and password is","Username : "+doctorLogin.getDrUsername()+" \nPassword : "+doctorLogin.getDrPassword());

            return DoctorAuthenticationResponse.builder()
                    .drId(doctorLogin.getDrId())
                    .drUsername(doctorLogin.getDrUsername())
                    .message("Success")
                    .build();

        }catch (Exception e){
            DoctorAuthenticationResponse response=new DoctorAuthenticationResponse();
            response.setMessage(e.getMessage());
            return response;
        }

    }

    public DoctorAuthenticationResponse doctorForgotPasswordUpdation(PasswordUpdateRequest request){
        try{
            Optional<DoctorLogin> doctorLoginOptional=doctorLoginRepository.findByDrUsername(request.getUsername());
            if(doctorLoginOptional.isPresent()){
                DoctorLogin doctorLogin=doctorLoginOptional.get();
                if(doctorLogin.getDrPassword().equals(request.getCurrentPassword())){
                    doctorLogin.setDrPassword(passwordEncoder.encode(request.getNewPassword()));
                    if(doctorLogin.getDrFirstTimeLogin())
                        doctorLogin.setDrFirstTimeLogin(false);
                    doctorLoginRepository.save(doctorLogin);

                    //var jwtToken=jwtService.generateToken(doctorLogin);

                    return DoctorAuthenticationResponse.builder()
                            .message("Success")
                            .build();

                }
                else
                    return DoctorAuthenticationResponse.builder()
                            .message("Invalid Password")
                            .build();
            } else{
                return DoctorAuthenticationResponse.builder()
                        .message("Invalid Username")
                        .build();
            }
        }catch (Exception e){
            return DoctorAuthenticationResponse.builder()
                    .message("Invalid Username and password")
                    .build();
        }
    }

    public DoctorAuthenticationResponse authenticateDoctor(AuthenticationRequest request) {
        try{
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );
            DoctorLogin doctorLogin = doctorLoginRepository.findByDrUsername(request.getUsername())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            // Get ptRegNo
            if(!doctorLogin.getDrFirstTimeLogin()){
                var jwtToken=jwtService.generateToken(doctorLogin);

                return DoctorAuthenticationResponse.builder()
                        .token(jwtToken)
                        .drId(doctorLogin.getDrId())
                        .drUsername(doctorLogin.getDrUsername())
                        .message("Success")
                        .build();
            }
            else
                return DoctorAuthenticationResponse.builder()
                        .message("Please click on the link provided in email and set your password on first login")
                        .build();
        }catch (AuthenticationException e) {
            // Authentication failed, handle the exception
            return DoctorAuthenticationResponse.builder()
                    .message("Invalid username or password")
                    .build();
            //throw new BadCredentialsException("Invalid username or password", e);
        }
    }

    public boolean drForgotPasswordSendMail(String mail) {
        Optional<DoctorLogin> doctorLoginOptional=doctorLoginRepository.findByDrEmail(mail);
        String setPasswordURL="http://localhost:3000/setPassword";
        if(doctorLoginOptional.isPresent()){
            DoctorLogin user=doctorLoginOptional.get();
            if(user!=null)
            {
                String password = randomPasswordGenerationService.randomPasswordGeneration();
                user.setDrPassword(password);
                doctorLoginRepository.save(user);
                emailService.sendSimpleMessage(user.getDrEmail(), "Dear User your Username and password is","Username : "+user.getDrUsername()+" \nPassword : "+user.getDrPassword()+"\nURL : "+setPasswordURL);
                return true;
            }
        }
        return false;
    }

}
