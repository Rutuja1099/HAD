package com.example.had_backend_jwt.Controllers;


import com.example.had_backend_jwt.Entities.Answers;
import com.example.had_backend_jwt.Entities.PatientInfo;
import com.example.had_backend_jwt.Entities.Questions;
import com.example.had_backend_jwt.JWT.JwtService;
import com.example.had_backend_jwt.Models.QandAnswerDTO;
import com.example.had_backend_jwt.Models.QandAnswerDoctorDTO;
import com.example.had_backend_jwt.Repositories.*;
import com.example.had_backend_jwt.Services.ForumService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.example.had_backend_jwt.Services.Utilities;
import com.example.had_backend_jwt.Services.ForumService;


import java.util.*;


@RestController
@RequestMapping("/suhrud/forum")
public class ForumController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private ForumService forumService;

    @Autowired
    private AnswersRepository answersRepository;

    @Autowired
    private QuestionsRepository questionsRepository;

    @PutMapping("/upVoteAnswer")
    @PreAuthorize("hasAuthority('Patient') or hasAuthority('Doctor')" )
    public ResponseEntity<?> upVoteAnswer(HttpServletRequest req, @RequestParam Integer answerId) {
        String token = Utilities.resolveToken(req);
        String role = jwtService.extractRole(token);
        if (token != null) {
            if(role.equals("Doctor")) {
                int id = jwtService.extractId(req,"doctorId" );
            } else if (role.equals("Patient")) {
                int id = jwtService.extractId(req, "patientId");
            }
            else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Role not found");
            }
            Answers answer = answersRepository.findAnswersByAnswerId(answerId);
            if (answer == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Answer not found");
            } else {
                Integer countVote = answer.getUpVote();
                countVote = countVote + 1;
                try {
                    answer.setUpVote(countVote);
                    Answers updated = answersRepository.save(answer);
                    return ResponseEntity.ok("Updated Successfully");
                } catch (Exception e) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
                }
            }
        }
        else{
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unidentified Token");
        }
    }


    @PutMapping("/flagAnswer")
    @PreAuthorize("hasAuthority('Patient') or hasAuthority('Doctor')")
    public ResponseEntity<?> flagAnswer(HttpServletRequest req, @RequestParam Integer answerId) {
        String token = Utilities.resolveToken(req);
        String role = jwtService.extractRole(token);
        if (token != null) {
            if(role.equals("Doctor")) {
                int id = jwtService.extractId(req,"doctorId" );
            } else if (role.equals("Patient")) {
                int id = jwtService.extractId(req, "patientId");
            }
            else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Role not found");
            }
            Answers answer = answersRepository.findAnswersByAnswerId(answerId);
            if (answer == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Answer not found");
            } else {
                Integer countFlags = answer.getAflagCount();
                countFlags = countFlags + 1;
                try {
                    answer.setAflagCount(countFlags);
                    Answers updated = answersRepository.save(answer);
                    return ResponseEntity.ok("Updated Successfully");
                } catch (Exception e) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
                }

            }
        }
        else{
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unidentified Token");
        }
    }

    @PutMapping("/flagQuestion")
    @PreAuthorize("hasAuthority('Patient') or hasAuthority('Doctor')")
    public ResponseEntity<?> flagQuestion(HttpServletRequest req, @RequestParam Integer queryId) {
        String token = Utilities.resolveToken(req);
        String role = jwtService.extractRole(token);
        System.out.println("Role : "+role);
        if (role != null) {
            if(role.equals("Doctor")) {
                int id = jwtService.extractId(req,"doctorId" );
            } else if (role.equals("Patient")) {
                int id = jwtService.extractId(req, "patientId");
            }
            else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Role not found");
            }
            Questions question = questionsRepository.findQuestionsByQueryId(queryId);
            if (question == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Question does not exist");
            } else {
                Integer countFlags = question.getFlagCount();
                countFlags = countFlags + 1;
                try {
                    question.setFlagCount(countFlags);
                    Questions updated = questionsRepository.save(question);
                    return ResponseEntity.ok("Updated Successfully");
                } catch (Exception e) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
                }

            }
        }
        else{
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unidentified Token");
        }
    }



    @PostMapping("/postAnswer")
    @PreAuthorize("hasAuthority('Doctor')")
    public ResponseEntity<?> postAnswer(HttpServletRequest req, @RequestParam Integer queryId, @RequestBody String answerContent) {
        String token = Utilities.resolveToken(req);
        String role = jwtService.extractRole(token);
        if (role != null) {
            int id = jwtService.extractId(req,"doctorId" );
            System.out.println("I am here");
            String isUpdated = forumService.postAnswers(id, queryId, answerContent);
            if (isUpdated.equals("Success")) {
                return ResponseEntity.ok("Updated Successfully");
            }
            else{
                return ResponseEntity.ok(isUpdated);
            }
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unidentified Token");
        }
        //return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Some error occured");
    }

    @GetMapping("/getAllQuestion")
    @PreAuthorize("hasAuthority('Patient') or hasAuthority('Doctor') or hasAuthority('Moderator')")
    public ResponseEntity<List<Questions>> getQuestionss(){

        try {
            List<Questions> questions = questionsRepository.findAll();
            System.out.println("Retrieved " + questions.size() + " questions");
            for (Questions question : questions) {
                System.out.println("Question ID: " + question.getQueryId() + ", Content: " + question.getQueryContent());
            }
            return ResponseEntity.ok(questions);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }

    }

    @DeleteMapping("/deleteQuestion")
    @PreAuthorize("hasAuthority('Moderator')")
    public ResponseEntity<?> deleteQuestion(@RequestParam Integer queryId){
        try{
            questionsRepository.deleteById(queryId);
            Map<String, Boolean> response = new HashMap<>();
            response.put("deleted", Boolean.TRUE);
            System.out.println("deletion here");
            return ResponseEntity.ok(response);
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.toString());
        }

    }

    @PutMapping("/disableQuestion")
    @PreAuthorize("hasAuthority('Moderator')")
    public ResponseEntity<?> disableQuestion(@RequestParam Integer queryId){
        try{
            return ResponseEntity.ok("Success");
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.toString());
        }
    }

    @DeleteMapping("/deleteAnswer/{answerId}")
    @PreAuthorize("hasAuthority('Moderator')")
    public ResponseEntity<Map<String, Boolean>> deleteAnswer(@PathVariable Integer answerId){
        answersRepository.deleteById(answerId);

        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);

        return ResponseEntity.ok(response);
    }


    @PutMapping("/updateAnswer/{answerId}")
    @PreAuthorize("hasAuthority('Moderator')")
    public ResponseEntity<Map<String, Boolean>> updateAnswer( @PathVariable Integer answerId, @RequestBody String newAnswerContent){

        Optional<Answers> answer = answersRepository.findById(answerId);

        if (answer.isPresent()) {
            Answers answer1 = answer.get();
            answer1.setAnswerContent(newAnswerContent);
            answersRepository.save(answer1);
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("success", false));
        }

        return ResponseEntity.ok(Map.of("success", true));
    }


    @PostMapping("/postQuestion")
    @PreAuthorize("hasAuthority('Patient')")
    public ResponseEntity<String> postQuestion(HttpServletRequest req, @RequestParam String question){
        String token = Utilities.resolveToken(req);
        if(token==null)
            return ResponseEntity.badRequest().body("Missing or Invalid token");
        int id = jwtService.extractId(req,"patientId");
        boolean postQ=forumService.postQuestion(id,question);
        if(postQ)
            return ResponseEntity.ok().body("Question posted successfully");
        return ResponseEntity.badRequest().body("Some error");
    }

    @GetMapping("/getMyQuestions")
    @PreAuthorize("hasAuthority('Patient')")
    public ResponseEntity<?> getMyQuestions(HttpServletRequest req){
        String token = Utilities.resolveToken(req);
        if(token==null)
            return ResponseEntity.badRequest().body("Missing or invalid token");
        int id = jwtService.extractId(req,"patientId");
        List<Questions> questions=forumService.getMyQuestions(id);
        return ResponseEntity.ok().body(questions);
    }

    @GetMapping("/getAnswerPatient")
    @PreAuthorize("hasAuthority('Patient')")
    public ResponseEntity<List<QandAnswerDTO>> getAnswerPatient(@RequestParam Integer qId){
        Questions question= questionsRepository.findById(qId).orElse(null);
        if(question==null)
            return ResponseEntity.notFound().build();
        List<QandAnswerDTO> answer=forumService.getAnswerPatient(question);
        return ResponseEntity.ok().body(answer);
    }


    //using question id
    @GetMapping("/getAnswerDoctor")
    @PreAuthorize("hasAuthority('Doctor')")
    public ResponseEntity<List<QandAnswerDoctorDTO>> getAnswerDoctor(@RequestParam Integer qId){
        Questions question=questionsRepository.findById(qId).orElse(null);
        if(question==null)
            return ResponseEntity.notFound().build();
        List<QandAnswerDoctorDTO> answer=forumService.getAnswerDoctor(question);
        return ResponseEntity.ok().body(answer);
    }

    //using doctor id
    @GetMapping("/getAnswerDoctorrr")
    @PreAuthorize("hasAuthority('Doctor')")
    public ResponseEntity<List<QandAnswerDoctorDTO>> getAnswerDoctorrr(HttpServletRequest req){
        String token=Utilities.resolveToken(req);
        if(token==null)
            return ResponseEntity.notFound().build();
        int id= jwtService.extractId(req,"doctorId");
        System.out.println(id);
        List<QandAnswerDoctorDTO> answer=forumService.getAnswerDoctorrr(id);
        return ResponseEntity.ok().body(answer);

    }

    //this is optional (implement krr diya kyuki kuch dusra krne ko nhi tha)
    @GetMapping("/trendingAnswers")
    @PreAuthorize("hasAuthority('Doctor')")
    public ResponseEntity<List<QandAnswerDoctorDTO>> trendingAnswers(){
        List<QandAnswerDoctorDTO> answer=forumService.trendingAnswers();
        return ResponseEntity.ok().body(answer);
    }



}
