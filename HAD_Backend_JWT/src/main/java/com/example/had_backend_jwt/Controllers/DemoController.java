package com.example.had_backend_jwt.Controllers;

import com.example.had_backend_jwt.Entities.PatientInfo;
import com.example.had_backend_jwt.Entities.Questionnaire;
import com.example.had_backend_jwt.JWT.JwtAuthenticationFilter;
import com.example.had_backend_jwt.Models.*;
import com.example.had_backend_jwt.Models.PatientAuthenticationResponse;
import com.example.had_backend_jwt.Repositories.PatientInfoRepository;
import com.example.had_backend_jwt.Repositories.QuestionnaireRepository;
import com.example.had_backend_jwt.Services.*;
import com.example.had_backend_jwt.JWT.*;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/suhrud/hello")
public class DemoController {
    @Autowired
    private pService pService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private PatientInfoRepository patientInfoRepository;

    @Autowired
    private QuestionnaireRepository qrepo;

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

    @DeleteMapping("/deletepatient")
    @PreAuthorize("hasAuthority('Patient')")
    public String deletePatient(HttpServletRequest req)
    {
        String token=resolveToken(req);
        if(token != null){
            int id = jwtService.extractId(token);
            boolean userRemoved=pService.deletePatient(id);
            if(userRemoved)
                return "User Deleted";
            return "error";
        }
        return "error";
    }

    @PutMapping("/updatepatient")
    @PreAuthorize("hasAuthority('Patient')")
    public ResponseEntity<?> updatePatient(HttpServletRequest req, @RequestBody PatientInfo updatedPatient){
        String token=resolveToken(req);
        if(token!=null){
            int id = jwtService.extractId(token);
            PatientInfo user=patientInfoRepository.findPatientInfoByPtRegNo(id);
            if(user==null)
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User id not found in BD");
            boolean x=pService.updatePatient(user,updatedPatient);
            if(x)
                return ResponseEntity.ok("Updated Successfully");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Some error has occurred.");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Some error has occurred.");
    }

    @GetMapping("/patientinfo")
    @PreAuthorize("hasAuthority('Patient')")
    public ResponseEntity<PatientInfo> getPatientInfo(HttpServletRequest request) {
        String token = resolveToken(request);
        if (token != null) {
            String username = jwtService.extractUserName(token);
            PatientInfo patientInfo = pService.getPatientInfo(username);
            if (patientInfo != null) {
                return ResponseEntity.ok(patientInfo);
            }
        }
        return ResponseEntity.notFound().build();
    }
    private String resolveToken(HttpServletRequest req) {
        String bearerToken = req.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    @GetMapping("/getquestionnaire")
    @PreAuthorize("hasAuthority('Patient')")
    public ResponseEntity<List<Questionnaire>> getQuestions(){
        List<Questionnaire> questions=pService.getQuestions();
        if(questions==null)
            return ResponseEntity.notFound().build();
        return  ResponseEntity.ok(questions);
    }

    @PostMapping("/answerquestionnaire")
    @PreAuthorize("hasAuthority('Patient')")
    public ResponseEntity<String> getQuestions(@RequestBody AnswersDTO answersDTO){
        int severity=pService.calcSeverity(answersDTO);
        return  ResponseEntity.ok("Severity : "+severity);
    }
}

