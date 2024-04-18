package com.example.had_backend_jwt.Controllers;

import com.example.had_backend_jwt.Entities.DoctorInfo;
import com.example.had_backend_jwt.Entities.DoctorLogin;
import com.example.had_backend_jwt.JWT.JwtService;
import com.example.had_backend_jwt.Models.AuthenticationResponse;
import com.example.had_backend_jwt.Models.DoctorRegisterRequest;
import com.example.had_backend_jwt.Models.DoctorStatusDTO;
import com.example.had_backend_jwt.Repositories.DoctorInfoRepository;
import com.example.had_backend_jwt.Repositories.DoctorLoginRepository;
import com.example.had_backend_jwt.Repositories.QuestionsRepository;
import com.example.had_backend_jwt.Services.AdminAuthenticationService;
import com.example.had_backend_jwt.Services.DoctorAuthenticationService;
import com.example.had_backend_jwt.Services.EmailService;
import com.example.had_backend_jwt.Services.PatientService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/suhrud")
public class AdminController {

    private final DoctorAuthenticationService doctorAuthService;
    private final AdminAuthenticationService adminAuthService;
    private final JwtService jwtService;

    @Autowired
    private PatientService patientService;

    @Autowired
    private DoctorInfoRepository doctorInfoRepository;
    @Autowired
    private DoctorLoginRepository doctorLoginRepository;

    @Autowired
    private EmailService emailService;

    @PostMapping("/register/doctor")
    @PreAuthorize("hasAuthority('Admin')")
    public ResponseEntity<AuthenticationResponse> registerDoctor(@RequestBody DoctorRegisterRequest request){
        AuthenticationResponse response=doctorAuthService.registerDoctor(request);
        if(response.getMessage()!=null && !response.getMessage().equals("Success"))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        else
            return ResponseEntity.ok(response);
    }


//    @GetMapping("/getAllDoctorsInfo")
//    @PreAuthorize("hasAuthority('Admin')")
//    public ResponseEntity<List<DoctorInfo>> getDoctorsList(){
//        List<DoctorInfo> DoctorInfos=patientService.getAllDoctorsList();
//        return  ResponseEntity.ok(DoctorInfos);
//    }

    @GetMapping("/getAllDoctorsInfo")
    @PreAuthorize("hasAuthority('Admin')")
    public ResponseEntity<List<DoctorStatusDTO>> getDoctorsList(){
        List<DoctorStatusDTO> doctorStatusInfo = patientService.getAllDoctorsStatus();
        return  ResponseEntity.ok(doctorStatusInfo);
    }

    @PutMapping("/deactivateDoctor")
    @PreAuthorize("hasAuthority('Admin')")
    public ResponseEntity<?> deactivateDoctor(@RequestBody Integer doctorID){

        try {
            Optional<DoctorInfo> doctorInfoById = doctorInfoRepository.findById(doctorID);

            if (doctorInfoById.isEmpty()) {
                return ResponseEntity.ok(Map.of("success", false));
            }

            DoctorInfo doctorInfo = doctorInfoById.get();
            doctorInfo.setIsDeactivated(!doctorInfo.getIsDeactivated());

            doctorInfoRepository.save(doctorInfo);
            System.out.println("hehehehe");
            System.out.println(doctorInfo.getIsDeactivated());
            Optional<DoctorLogin> doctorLogin = doctorLoginRepository.findById(doctorID);
            DoctorLogin doctorLogin1 = doctorLogin.get();

            if(doctorInfo.getIsDeactivated()){
                emailService.sendSimpleMessage(doctorLogin1.getDrEmail(), "Account status","Dear User your account with username: "+doctorLogin1.getDrUsername()+ " is deactivated");
            }
            else{
                emailService.sendSimpleMessage(doctorLogin1.getDrEmail(), "Account status","Dear User your account with username: "+doctorLogin1.getDrUsername()+ " is Activated");
            }

            return ResponseEntity.ok(Map.of("success", true));

        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.toString());
        }
    }

    @DeleteMapping("/deleteDoctor")
    @PreAuthorize("hasAuthority('Admin')")
    public ResponseEntity<?> deleteDoctor(@RequestBody Integer doctorID){
        try {
            doctorInfoRepository.deleteById(doctorID);
            doctorLoginRepository.deleteById(doctorID);

            Optional<DoctorLogin> doctorLogin = doctorLoginRepository.findById(doctorID);
            if(doctorLogin.isPresent()) {
                DoctorLogin doctorLogin1 = doctorLogin.get();

                emailService.sendSimpleMessage(doctorLogin1.getDrEmail(), "Account Deletec", "Dear User your account with username: " + doctorLogin1.getDrUsername() + " is deleted");
            }
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.toString());
        }

        return ResponseEntity.ok(Map.of("success", true));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(HttpServletRequest request){
        jwtService.addToBlacklist(request);
        return ResponseEntity.ok("Successfully logged out");
    }
}
