package com.example.had_backend_jwt.Controllers;
import com.example.had_backend_jwt.Entities.DoctorInfo;


import com.example.had_backend_jwt.Models.*;
import com.example.had_backend_jwt.Repositories.DoctorInfoRepository;

import com.example.had_backend_jwt.Services.*;
import com.example.had_backend_jwt.JWT.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/suhrud")
public class DoctorController {

    @Autowired
    private pService pService;

    @GetMapping("/viewSuggestedDoctorsList")
    @PreAuthorize("hasAuthority('Patient')")
    public ResponseEntity<List<DoctorInfo>> getDoctorsList(){
        List<DoctorInfo> DoctorInfos=pService.getSuggestedDoctorsList();
        return  ResponseEntity.ok(DoctorInfos);
    }

}
