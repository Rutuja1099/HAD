package com.example.had_backend_jwt.Services;

import com.example.had_backend_jwt.Entities.DoctorInfo;
import com.example.had_backend_jwt.Entities.DoctorLogin;
import com.example.had_backend_jwt.JWT.JwtService;
import com.example.had_backend_jwt.Models.AuthenticationRequest;
import com.example.had_backend_jwt.Models.DoctorAuthenticationResponse;
import com.example.had_backend_jwt.Models.DoctorRegisterRequest;
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

@Service
@RequiredArgsConstructor
public class DoctorAuthenticationService {
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final DoctorInfoRepository doctorInfoRepository;
    private final DoctorLoginRepository doctorLoginRepository;
    private final AuthenticationManager authenticationManager;

    public DoctorAuthenticationResponse registerDoctor(DoctorRegisterRequest request){
        DoctorInfo doctorInfo=DoctorInfo.builder()
                .drFullName(request.getDrFullName())
                .drPhone(request.getDrPhone())
                .drAddr(request.getDrAddr())
                .drEmail(request.getDrEmail())
                .drExperience(request.getDrExperience())
                .drPatientLimit(request.getDrPatientLimit())
                .drActivePatients(request.getDrActivePatients())
                .drIsModerator(request.isDrIsModerator())
                .drGender(request.getDrGender())
                .build();

        doctorInfoRepository.save(doctorInfo);

        DoctorLogin doctorLogin=DoctorLogin.builder()
                .drUsername(request.getDrUsername())
                .drPassword(passwordEncoder.encode(request.getDrPassword()))
                .build();
        doctorLogin.setDrInfo(doctorInfo);

        doctorLoginRepository.save(doctorLogin);

        String jwtToken=jwtService.generateToken(doctorLogin);

        return DoctorAuthenticationResponse.builder()
                .token(jwtToken)
                .doctorInfo(doctorInfo)
                .build();
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
            DoctorInfo doctorInfo = doctorLogin.getDrInfo();

            var jwtToken=jwtService.generateToken(doctorLogin);

            return DoctorAuthenticationResponse.builder()
                    .token(jwtToken)
                    .doctorInfo(doctorInfo)
                    .build();
        }catch (AuthenticationException e) {
            // Authentication failed, handle the exception
            throw new BadCredentialsException("Invalid username or password", e);
        }
    }
}
