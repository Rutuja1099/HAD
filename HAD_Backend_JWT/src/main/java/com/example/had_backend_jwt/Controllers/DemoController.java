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

//    @DeleteMapping("/deletepatient")
//    @PreAuthorize("hasAuthority('Patient')")
//    public String deletePatient(HttpServletRequest req)
//    {
//        String token=Utilities.resolveToken(req);
//        if(token != null){
//            int id = jwtService.extractId(token);
//            boolean userRemoved=pService.deletePatient(id);
//            if(userRemoved)
//                return "User Deleted";
//            return "error";
//        }
//        return "error";
//    }

//    @PutMapping("/updatepatient")
//    @PreAuthorize("hasAuthority('Patient')")
//    public ResponseEntity<?> updatePatient(HttpServletRequest req, @RequestBody PatientInfo updatedPatient){
//        String token=Utilities.resolveToken(req);
//        if(token!=null){
//            int id = jwtService.extractId(token);
//            PatientInfo user=patientInfoRepository.findPatientInfoByPtRegNo(id);
//            if(user==null)
//                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User id not found in BD");
//            boolean x=pService.updatePatient(user,updatedPatient);
//            if(x)
//                return ResponseEntity.ok("Updated Successfully");
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Some error has occurred.");
//        }
//        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Some error has occurred.");
//    }

//    @GetMapping("/patientinfo")
//    @PreAuthorize("hasAuthority('Patient')")
//    public ResponseEntity<PatientInfo> getPatientInfo(HttpServletRequest request) {
//        String token = Utilities.resolveToken(request);
//        if (token != null) {
//            String username = jwtService.extractUserName(token);
//            PatientInfo patientInfo = pService.getPatientInfo(username);
//            if (patientInfo != null) {
//                return ResponseEntity.ok(patientInfo);
//            }
//        }
//        return ResponseEntity.notFound().build();
//    }

//    @GetMapping("/getquestionnaire")
//    @PreAuthorize("hasAuthority('Patient')")
//    public ResponseEntity<List<Questionnaire>> getQuestions(){
//        List<Questionnaire> questions=pService.getQuestions();
//        if(questions==null)
//            return ResponseEntity.notFound().build();
//        return  ResponseEntity.ok(questions);
//    }

//    @PostMapping("/answerquestionnaire")
//    @PreAuthorize("hasAuthority('Patient')")
//    public ResponseEntity<String> getQuestions(@RequestBody AnswersDTO answersDTO){
//        int severity=pService.calcSeverity(answersDTO);
//        return  ResponseEntity.ok("Severity : "+severity);
//    }


//    @PostMapping("/postQuestion")
//    @PreAuthorize("hasAuthority('Patient')")
//    public ResponseEntity<String> postQuestion(HttpServletRequest request, @RequestParam String question){
//        String token = Utilities.resolveToken(request);
//        if(token==null)
//            return ResponseEntity.notFound().build();
//        int id = jwtService.extractId(token);
//        boolean postQ=pService.postQuestion(id,question);
//        if(postQ)
//            return ResponseEntity.ok().body("Question posted successfully");
//        return ResponseEntity.badRequest().body("Some error");
//    }
//
//    @GetMapping("/getMyQuestions")
//    @PreAuthorize("hasAuthority('Patient')")
//    public ResponseEntity<List<Questions>> getMyQuestions(HttpServletRequest request){
//        String token=Utilities.resolveToken(request);
//        if(token==null)
//            return ResponseEntity.notFound().build();
//        int id=jwtService.extractId(token);
//        List<Questions> questions=pService.getMyQuestions(id);
//        return ResponseEntity.ok().body(questions);
//    }
//
//    @GetMapping("/getAnswerPatient")
//    @PreAuthorize("hasAuthority('Patient')")
//    public ResponseEntity<List<QandAnswerDTO>> getAnswerPatient(@RequestParam Integer qId){
//        Questions question= questionRepository.findById(qId).orElse(null);
//        if(question==null)
//            return ResponseEntity.notFound().build();
//        List<QandAnswerDTO> answer=pService.getAnswerPatient(question);
//        return ResponseEntity.ok().body(answer);
//    }
//
//
//    //using question id
//    @GetMapping("/getAnswerDoctor")
//    @PreAuthorize("hasAuthority('Doctor')")
//    public ResponseEntity<List<QandAnswerDoctorDTO>> getAnswerDoctor(@RequestParam Integer qId){
//        Questions question=questionRepository.findById(qId).orElse(null);
//        if(question==null)
//            return ResponseEntity.notFound().build();
//        List<QandAnswerDoctorDTO> answer=pService.getAnswerDoctor(question);
//        return ResponseEntity.ok().body(answer);
//    }
//
//    //using doctor id
//    @GetMapping("/getAnswerDoctorrr")
//    @PreAuthorize("hasAuthority('Doctor')")
//    public ResponseEntity<List<QandAnswerDoctorDTO>> getAnswerDoctorrr(HttpServletRequest req){
//        String token=Utilities.resolveToken(req);
//        if(token==null)
//            return ResponseEntity.notFound().build();
//        String username= jwtService.extractUserName(token);
//        List<QandAnswerDoctorDTO> answer=pService.getAnswerDoctorrr(username);
//        return ResponseEntity.ok().body(answer);
//    }


}

