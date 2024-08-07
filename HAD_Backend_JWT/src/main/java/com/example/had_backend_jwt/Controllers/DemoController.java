package com.example.had_backend_jwt.Controllers;

import com.example.had_backend_jwt.Entities.Answers;
import com.example.had_backend_jwt.Entities.PatientInfo;
import com.example.had_backend_jwt.Entities.Questionnaire;
import com.example.had_backend_jwt.Repositories.PatientInfoRepository;
import com.example.had_backend_jwt.Repositories.QuestionnaireRepository;
import com.example.had_backend_jwt.Repositories.QuestionsRepository;
import com.example.had_backend_jwt.Services.*;
import com.example.had_backend_jwt.JWT.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.example.had_backend_jwt.Services.Utilities;

import java.util.List;

@RestController
@RequestMapping("/suhrud/hello")
public class DemoController {
    @GetMapping("/moderator")
    @PreAuthorize("hasAuthority('Moderator')")
    public ResponseEntity<String> sayHello(){
        return ResponseEntity.ok("Hello from secured endpoint");
    }

    @GetMapping("/doctor")
    @PreAuthorize("hasAuthority('Doctor')")
    public ResponseEntity<String> sayDoctor(){
        return ResponseEntity.ok("Hello Doctor");
    }

    @GetMapping("/")
    @PreAuthorize("hasAuthority('Patient')")
    public ResponseEntity<String> sayPatient(){
        return ResponseEntity.ok("Hello Patient");
    }

}

