package com.example.had_backend_jwt.Services;

import com.example.had_backend_jwt.Entities.DoctorInfo;
import com.example.had_backend_jwt.Entities.DoctorLogin;
import com.example.had_backend_jwt.JWT.JwtService;
import com.example.had_backend_jwt.Models.AuthenticationRequest;
import com.example.had_backend_jwt.Models.DoctorAuthenticationResponse;
import com.example.had_backend_jwt.Models.DoctorRegisterRequest;
import com.example.had_backend_jwt.Models.PasswordUpdateRequest;
import com.example.had_backend_jwt.Repositories.DoctorInfoRepository;
import com.example.had_backend_jwt.Repositories.DoctorLoginRepository;
import lombok.RequiredArgsConstructor;
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
                    .drPassword(randomPasswordGeneration())
                    .drEmail(request.getDrEmail())
                    .build();
            doctorLogin.setDrInfo(doctorInfo);

            doctorLoginRepository.save(doctorLogin);

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

    public static String randomPasswordGeneration(){
        final String charLower = "abcdefghijklmnopqrstuvwxyz";
        final String charUpper = charLower.toUpperCase();
        final String number = "0123456789";
        final String otherChar = "!@#$%&*()_+-=[]?";

        final String passwordBase = charLower+ charUpper + number + otherChar;
        final SecureRandom random = new SecureRandom();

        StringBuilder password = new StringBuilder(12);
        password.append(randomChar(charLower));
        password.append(randomChar(charUpper));
        password.append(randomChar(number));
        password.append(randomChar(otherChar));

        for (int i = 4; i < 12; i++) {
            password.append(randomChar(passwordBase));
        }

        return password.toString();
    }

    private static char randomChar(String inputString) {
        Random random=new Random();
        int randomIndex = random.nextInt(inputString.length());
        return inputString.charAt(randomIndex);
    }


    public DoctorAuthenticationResponse doctorPasswordUpdationFirstTime(PasswordUpdateRequest request){
        try{
            Optional<DoctorLogin> doctorLoginOptional=doctorLoginRepository.findByDrUsername(request.getUsername());
            if(doctorLoginOptional.isPresent()){
                DoctorLogin doctorLogin=doctorLoginOptional.get();
                if(doctorLogin.getDrPassword().equals(request.getCurrentPassword())){
                    doctorLogin.setDrPassword(passwordEncoder.encode(request.getNewPassword()));
                    doctorLoginRepository.save(doctorLogin);

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

            var jwtToken=jwtService.generateToken(doctorLogin);

            return DoctorAuthenticationResponse.builder()
                    .token(jwtToken)
                    .drId(doctorLogin.getDrId())
                    .drUsername(doctorLogin.getDrUsername())
                    .message("Success")
                    .build();
        }catch (AuthenticationException e) {
            // Authentication failed, handle the exception
            return DoctorAuthenticationResponse.builder()
                    .message("Invalid username or password")
                    .build();
            //throw new BadCredentialsException("Invalid username or password", e);
        }
    }
}
