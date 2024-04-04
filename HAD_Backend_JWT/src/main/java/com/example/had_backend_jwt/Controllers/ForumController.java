package com.example.had_backend_jwt.Controllers;


import com.example.had_backend_jwt.Entities.Answers;
import com.example.had_backend_jwt.Entities.Questions;
import com.example.had_backend_jwt.JWT.JwtService;
import com.example.had_backend_jwt.Repositories.AnswersRepository;
import com.example.had_backend_jwt.Repositories.QuestionsRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.had_backend_jwt.Services.Utilities;


@RestController
@RequestMapping("/suhrud/forum")
public class ForumController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AnswersRepository answersRepository;

    @Autowired
    private QuestionsRepository questionsRepository;

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
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Some error occured in updating upvote");
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

}
