package com.example.had_backend_jwt.Controllers;


import com.example.had_backend_jwt.Entities.Answers;
import com.example.had_backend_jwt.Entities.PatientInfo;
import com.example.had_backend_jwt.Entities.Questions;
import com.example.had_backend_jwt.JWT.JwtService;
import com.example.had_backend_jwt.Models.QandAnswerDTO;
import com.example.had_backend_jwt.Models.QandAnswerDoctorDTO;
import com.example.had_backend_jwt.Repositories.*;
import com.example.had_backend_jwt.Services.pService;
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
@RequestMapping("suhrud/forum")
public class ForumController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AnswersRepository answersRepository;

    @Autowired
    private QuestionsRepository questionsRepository;

    @Autowired
    private com.example.had_backend_jwt.Services.pService pService;
    @Autowired
    private PatientInfoRepository patientInfoRepository;

    @Autowired
    private DoctorInfoRepository doctorInfoRepository;
    @Autowired
    private QuestionnaireRepository qrepo;





    @PutMapping("/upVoteAnswer")
    @PreAuthorize("hasAuthority('Patient,Doctor')")
    public ResponseEntity<?> upVoteAnswer(HttpServletRequest req, @RequestBody Integer answerId) {
        String token = Utilities.resolveToken(req);
        if (token != null) {
            int id = jwtService.extractId(token);
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
    @PreAuthorize("hasAuthority('Patient,Doctor')")
    public ResponseEntity<?> flagAnswer(HttpServletRequest req, @RequestBody Integer answerId) {
        String token = Utilities.resolveToken(req);
        if (token != null) {
            int id = jwtService.extractId(token);
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
    @PreAuthorize("hasAuthority('Patient,Doctor')")
    public ResponseEntity<?> flagQuestion(HttpServletRequest req, @RequestBody Integer queryId) {
        String token = Utilities.resolveToken(req);
        if (token != null) {
            int id = jwtService.extractId(token);
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
    public ResponseEntity<?> postAnswer(HttpServletRequest req, @RequestBody Integer queryId, String answerContent) {
        String token = Utilities.resolveToken(req);
        if (token != null) {
            int id = jwtService.extractId(token);

            boolean isUpdated = ForumService.postAnswers(id, queryId, answerContent);
            if (isUpdated) {
                return ResponseEntity.ok("Updated Successfully");
            }
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unidentified Token");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Some error occured");
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

    @DeleteMapping("/deleteQuestion/{queryId}")
    @PreAuthorize("hasAuthority('Moderator')")
    public ResponseEntity<Map<String, Boolean>> deleteQuestion(@PathVariable Integer queryId){
        questionsRepository.deleteById(queryId);

        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        System.out.println("deletion here");
        return ResponseEntity.ok(response);
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
    public ResponseEntity<String> postQuestion(HttpServletRequest request, @RequestParam String question){
        String token = Utilities.resolveToken(request);
        if(token==null)
            return ResponseEntity.notFound().build();
        int id = jwtService.extractId(token);
        boolean postQ=pService.postQuestion(id,question);
        if(postQ)
            return ResponseEntity.ok().body("Question posted successfully");
        return ResponseEntity.badRequest().body("Some error");
    }

    @GetMapping("/getMyQuestions")
    @PreAuthorize("hasAuthority('Patient')")
    public ResponseEntity<List<Questions>> getMyQuestions(HttpServletRequest request){
        String token=Utilities.resolveToken(request);
        if(token==null)
            return ResponseEntity.notFound().build();
        int id=jwtService.extractId(token);
        List<Questions> questions=pService.getMyQuestions(id);
        return ResponseEntity.ok().body(questions);
    }

    @GetMapping("/getAnswerPatient")
    @PreAuthorize("hasAuthority('Patient')")
    public ResponseEntity<List<QandAnswerDTO>> getAnswerPatient(@RequestParam Integer qId){
        Questions question= questionsRepository.findById(qId).orElse(null);
        if(question==null)
            return ResponseEntity.notFound().build();
        List<QandAnswerDTO> answer=pService.getAnswerPatient(question);
        return ResponseEntity.ok().body(answer);
    }


    //using question id
    @GetMapping("/getAnswerDoctor")
    @PreAuthorize("hasAuthority('Doctor')")
    public ResponseEntity<List<QandAnswerDoctorDTO>> getAnswerDoctor(@RequestParam Integer qId){
        Questions question=questionsRepository.findById(qId).orElse(null);
        if(question==null)
            return ResponseEntity.notFound().build();
        List<QandAnswerDoctorDTO> answer=pService.getAnswerDoctor(question);
        return ResponseEntity.ok().body(answer);
    }

    //using doctor id
    @GetMapping("/getAnswerDoctorrr")
    @PreAuthorize("hasAuthority('Doctor')")
    public ResponseEntity<List<QandAnswerDoctorDTO>> getAnswerDoctorrr(HttpServletRequest req){
        String token=Utilities.resolveToken(req);
        if(token==null)
            return ResponseEntity.notFound().build();
        String username= jwtService.extractUserName(token);
        List<QandAnswerDoctorDTO> answer=pService.getAnswerDoctorrr(username);
        return ResponseEntity.ok().body(answer);

    }

    //this is optional (implement krr diya kyuki kuch dusra krne ko nhi tha)
    @GetMapping("/trendingAnswers")
    @PreAuthorize("hasAuthority('Doctor')")
    public ResponseEntity<List<QandAnswerDoctorDTO>> trendingAnswers(){
        List<QandAnswerDoctorDTO> answer=pService.trendingAnswers();
        return ResponseEntity.ok().body(answer);
    }



}
