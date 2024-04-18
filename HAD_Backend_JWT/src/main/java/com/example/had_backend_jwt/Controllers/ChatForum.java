package com.example.had_backend_jwt.Controllers;

import com.example.had_backend_jwt.Entities.DoctorInfo;
import com.example.had_backend_jwt.JWT.JwtService;
import com.example.had_backend_jwt.Repositories.*;
import com.example.had_backend_jwt.Services.PatientService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.example.had_backend_jwt.Services.Utilities;

import java.util.List;

@RestController
@RequestMapping("/suhrud/chat")
public class ChatForum {

    @Autowired
    private PatientService patientService;

    @GetMapping("/getMappedDoctors")
    @PreAuthorize("hasAuthority('Patient')")
    public ResponseEntity<List<DoctorInfo>> getDoctorsList(){
        List<DoctorInfo> DoctorInfos=patientService.getAllDoctorsList();
        return  ResponseEntity.ok(DoctorInfos);
    }
}
