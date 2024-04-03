package com.example.had_backend_jwt.Controllers;

import com.example.had_backend_jwt.Entities.PatientInfo;
import com.example.had_backend_jwt.Entities.Questionnaire;
import com.example.had_backend_jwt.JWT.JwtService;
import com.example.had_backend_jwt.Models.AnswersDTO;
import com.example.had_backend_jwt.Repositories.PatientInfoRepository;
import com.example.had_backend_jwt.Services.ExtractTokenInfo;
import com.example.had_backend_jwt.Services.PatientService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/suhrud/patient")
public class PatientController {
    @Autowired
    private com.example.had_backend_jwt.Services.PatientService PatientService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private PatientInfoRepository patientInfoRepository;
    @Autowired
    private ExtractTokenInfo extractTokenInfo;

    @Autowired PatientService patientService;

    @DeleteMapping("/deletepatient")
    @PreAuthorize("hasAuthority('Patient')")
    public String deletePatient(HttpServletRequest req)
    {
        String token=extractTokenInfo.resolveToken(req);
        if(token != null){
            int id = jwtService.extractId(token,"patientId");
            boolean userRemoved= patientService.deletePatient(id);
            if(userRemoved)
                return "User Deleted";
            return "error";
        }
        return "error";
    }

    @PutMapping("/updatepatient")
    @PreAuthorize("hasAuthority('Patient')")
    public ResponseEntity<?> updatePatient(HttpServletRequest req, @RequestBody PatientInfo updatedPatient){
        String token=extractTokenInfo.resolveToken(req);
        if(token!=null){
            int id = jwtService.extractId(token,"patientId");
            PatientInfo user=patientInfoRepository.findPatientInfoByPtRegNo(id);
            if(user==null)
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User id not found in BD");
            boolean x= patientService.updatePatient(user,updatedPatient);
            if(x)
                return ResponseEntity.ok("Updated Successfully");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Some error has occurred.");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Some error has occurred.");
    }

    @GetMapping("/patientinfo")
    @PreAuthorize("hasAuthority('Patient')")
    public ResponseEntity<PatientInfo> getPatientInfo(HttpServletRequest request) {
        String token = extractTokenInfo.resolveToken(request);
        if (token != null) {
            String username = jwtService.extractUserName(token);
            PatientInfo patientInfo = patientService.getPatientInfo(username);
            if (patientInfo != null) {
                return ResponseEntity.ok(patientInfo);
            }
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/getquestionnaire")
    @PreAuthorize("hasAuthority('Patient')")
    public ResponseEntity<List<Questionnaire>> getQuestions(){
        List<Questionnaire> questions= patientService.getQuestions();
        if(questions==null)
            return ResponseEntity.notFound().build();
        return  ResponseEntity.ok(questions);
    }

    @PostMapping("/answerquestionnaire")
    @PreAuthorize("hasAuthority('Patient')")
    public ResponseEntity<String> getQuestions(@RequestBody AnswersDTO answersDTO){
        int severity= patientService.calcSeverity(answersDTO);
        return  ResponseEntity.ok("Severity : "+severity);
    }

//    @GetMapping("/appointment")
//    public ResponseEntity<?>
}
