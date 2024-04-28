package com.example.had_backend_jwt.Controllers;


import com.example.had_backend_jwt.Entities.*;
import com.example.had_backend_jwt.JWT.JwtService;
import com.example.had_backend_jwt.Models.QandAnswerDTO;
import com.example.had_backend_jwt.Models.QandAnswerDoctorDTO;
import com.example.had_backend_jwt.Models.QuestionsDTO;
import com.example.had_backend_jwt.Repositories.*;
import com.example.had_backend_jwt.Services.ForumService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.parameters.P;
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
    private DoctorInfoRepository doctorInfoRepository;
    @Autowired
    private PatientInfoRepository patientInfoRepository;
    @Autowired
    private FlagTableQuestionPatientRepository flagTableQuestionPatientRepository;

    @Autowired
    private ForumService forumService;

    @Autowired
    private AnswersRepository answersRepository;

    @Autowired
    private QuestionsRepository questionsRepository;
    @Autowired
    private FlagTableQuestionDoctorRepository flagTableQuestionDoctorRepository;
    @Autowired
    private FlagTableAnswerDoctorRepository flagTableAnswerDoctorRepository;
    @Autowired
    private FlagTableAnswerPatientRepository flagTableAnswerPatientRepository;
    @Autowired
    private UpVoteAnswerPatientRepository upVoteAnswerPatientRepository;
    @Autowired
    private UpVoteAnswerDoctorRepository upVoteAnswerDoctorRepository;

    @PutMapping("/upVoteAnswer")
    @PreAuthorize("hasAuthority('Patient') or hasAuthority('Doctor')" )
    public ResponseEntity<?> upVoteAnswer(HttpServletRequest req, @RequestParam Integer answerId) {
        String token = Utilities.resolveToken(req);
        String role = jwtService.extractRole(token);
        Answers answer=answersRepository.findAnswersByAnswerId(answerId);
        if (token != null) {
            if(role.equals("Doctor")) {
                int id = jwtService.extractId(req,"doctorId" );
                DoctorInfo doctorInfo=doctorInfoRepository.findDoctorInfoByDrId(id);
                UpVoteAnswerDoctor upVoteAnswerDoctor=new UpVoteAnswerDoctor();
                upVoteAnswerDoctor.setAnswers(answer);
                upVoteAnswerDoctor.setDoctorInfo(doctorInfo);
                upVoteAnswerDoctorRepository.save(upVoteAnswerDoctor);
            } else if (role.equals("Patient")) {
                int id = jwtService.extractId(req, "patientId");
                PatientInfo patientInfo=patientInfoRepository.findPatientInfoByPtRegNo(id);
                UpVoteAnswerPatient upVoteAnswerPatient=new UpVoteAnswerPatient();
                upVoteAnswerPatient.setAnswers(answer);
                upVoteAnswerPatient.setPatientInfo(patientInfo);
                upVoteAnswerPatientRepository.save(upVoteAnswerPatient);
            }
            else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Role not found");
            }
//            Answers answer = answersRepository.findAnswersByAnswerId(answerId);
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
        System.out.println("Role : "+role);
        if(role==null)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unidentified Token");
        Answers answers = answersRepository.findAnswersByAnswerId(answerId);
        if (answers == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Answer does not exist");
        Integer countFlags = answers.getAflagCount();
        countFlags = countFlags + 1;
        answers.setAflagCount(countFlags);
        Answers updated=answersRepository.save(answers);
        if(role.equals("Doctor")){
            FlagTableAnswerDoctor flagTableAnswerDoctor=new FlagTableAnswerDoctor();
            flagTableAnswerDoctor.setAnswers(answers);
            int id=jwtService.extractId(req,"doctorId");
            flagTableAnswerDoctor.setDoctorInfo(doctorInfoRepository.findDoctorInfoByDrId(id));
            flagTableAnswerDoctorRepository.save(flagTableAnswerDoctor);
            return ResponseEntity.ok().body("Success");
        } else if (role.equals("Patient")) {
            FlagTableAnswerPatient flagTableAnswerPatient=new FlagTableAnswerPatient();
            flagTableAnswerPatient.setAnswers(answers);
            int id=jwtService.extractId(req,"patientId");
            flagTableAnswerPatient.setPatientInfo(patientInfoRepository.findPatientInfoByPtRegNo(id));
            flagTableAnswerPatientRepository.save(flagTableAnswerPatient);
            return ResponseEntity.ok().body("Success");
        }
        else{
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Role not found");
        }

//        if (token != null) {
//            if(role.equals("Doctor")) {
//                int id = jwtService.extractId(req,"doctorId" );
//            } else if (role.equals("Patient")) {
//                int id = jwtService.extractId(req, "patientId");
//            }
//            else {
//                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Role not found");
//            }
//            Answers answer = answersRepository.findAnswersByAnswerId(answerId);
//            if (answer == null) {
//                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Answer not found");
//            } else {
//                Integer countFlags = answer.getAflagCount();
//                countFlags = countFlags + 1;
//                try {
//                    answer.setAflagCount(countFlags);
//                    Answers updated = answersRepository.save(answer);
//                    return ResponseEntity.ok("Updated Successfully");
//                } catch (Exception e) {
//                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
//                }
//
//            }
//        }
//        else{
//            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unidentified Token");
//        }
    }

    @PutMapping("/flagQuestion")
    @PreAuthorize("hasAuthority('Patient') or hasAuthority('Doctor')")
    public ResponseEntity<?> flagQuestion(HttpServletRequest req, @RequestParam Integer queryId) {
        String token = Utilities.resolveToken(req);
        String role = jwtService.extractRole(token);
        System.out.println("Role : "+role);
        if(role==null)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unidentified Token");
        Questions question = questionsRepository.findQuestionsByQueryId(queryId);
        if (question == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Question does not exist");
        Integer countFlags = question.getFlagCount();
        countFlags = countFlags + 1;
        question.setFlagCount(countFlags);
        Questions updated=questionsRepository.save(question);
        if(role.equals("Doctor")){
            FlagTableQuestionDoctor flagTableQuestionDoctor=new FlagTableQuestionDoctor();
            flagTableQuestionDoctor.setQuestion(question);
            int id=jwtService.extractId(req,"doctorId");
            flagTableQuestionDoctor.setDoctorInfo(doctorInfoRepository.findDoctorInfoByDrId(id));
            flagTableQuestionDoctorRepository.save(flagTableQuestionDoctor);
            return ResponseEntity.ok().body("Success");
        } else if (role.equals("Patient")) {
            FlagTableQuestionPatient flagTableQuestionPatient=new FlagTableQuestionPatient();
            flagTableQuestionPatient.setQuestion(question);
            int id=jwtService.extractId(req,"patientId");
            flagTableQuestionPatient.setPatientInfo(patientInfoRepository.findPatientInfoByPtRegNo(id));
            flagTableQuestionPatientRepository.save(flagTableQuestionPatient);
            return ResponseEntity.ok().body("Success");
        }
        else{
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Role not found");
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

//    @GetMapping("/getAllQuestion")
//    @PreAuthorize("hasAuthority('Patient') or hasAuthority('Doctor') or hasAuthority('Moderator')")
//    public ResponseEntity<List<Questions>> getQuestionss(){
//
//        try {
//            List<Questions> questions = questionsRepository.findAll();
//            System.out.println("Retrieved " + questions.size() + " questions");
//            for (Questions question : questions) {
//                System.out.println("Question ID: " + question.getQueryId() + ", Content: " + question.getQueryContent());
//            }
//            return ResponseEntity.ok(questions);
//        } catch (Exception e) {
//            return ResponseEntity.notFound().build();
//        }
//
//    }
    @GetMapping("/getAllQuestion")
    @PreAuthorize("hasAuthority('Patient') or hasAuthority('Doctor') or hasAuthority('Moderator')")
    public ResponseEntity<List<QuestionsDTO>> getQuestions(HttpServletRequest req){
        String token = Utilities.resolveToken(req);
        String role = jwtService.extractRole(token);
        System.out.println("Role : "+role);
        if (role == null)
            return ResponseEntity.badRequest().build();
        List<Questions> questions = questionsRepository.findAll();
        if(role.equals("Doctor"))
        {
            int id=jwtService.extractId(req,"doctorId" );
            List<QuestionsDTO> qs=new ArrayList<>();
            List<FlagTableQuestionDoctor> list=flagTableQuestionDoctorRepository.findByDoctorInfo(doctorInfoRepository.findDoctorInfoByDrId(id));
            Set<Questions> setQ=new HashSet<>();
            for(FlagTableQuestionDoctor f:list)
            {
                setQ.add(f.getQuestion());
            }
            for(Questions q:questions)
            {
                QuestionsDTO obj=new QuestionsDTO();
                obj.setQueryId(q.getQueryId());
                obj.setIsUrgent(q.getIsUrgent());
                obj.setFlagCount(q.getFlagCount());
                obj.setAnswers(q.getAnswers());
                obj.setQueryContent(q.getQueryContent());
                obj.setFlagged(setQ.contains(q));
                qs.add(obj);
            }
            return ResponseEntity.ok(qs);
        } else if (role.equals("Patient")) {
            int id=jwtService.extractId(req,"patientId" );
            List<QuestionsDTO> qs=new ArrayList<>();
            List<FlagTableQuestionPatient> list=flagTableQuestionPatientRepository.findByPatientInfo(patientInfoRepository.findPatientInfoByPtRegNo(id));
            Set<Questions> setQ=new HashSet<>();
            for(FlagTableQuestionPatient f:list)
            {
                setQ.add(f.getQuestion());
            }
            for(Questions q:questions)
            {
                QuestionsDTO obj=new QuestionsDTO();
                obj.setQueryId(q.getQueryId());
                obj.setIsUrgent(q.getIsUrgent());
                obj.setFlagCount(q.getFlagCount());
                obj.setAnswers(q.getAnswers());
                obj.setQueryContent(q.getQueryContent());
                obj.setFlagged(setQ.contains(q));
                qs.add(obj);
            }
            return ResponseEntity.ok(qs);
        }
        else{
            List<QuestionsDTO> qs=new ArrayList<>();
            for(Questions q:questions)
            {
                QuestionsDTO obj=new QuestionsDTO();
                obj.setQueryId(q.getQueryId());
                obj.setIsUrgent(q.getIsUrgent());
                obj.setFlagCount(q.getFlagCount());
                obj.setAnswers(q.getAnswers());
                obj.setQueryContent(q.getQueryContent());
                obj.setFlagged(false);
                qs.add(obj);
            }
            return ResponseEntity.ok(qs);
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
        int id=jwtService.extractId(req,"patientId" );
        List<Questions> questions=questionsRepository.findQuestionsByPatientInfo(patientInfoRepository.findPatientInfoByPtRegNo(id));
        List<QuestionsDTO> qs=new ArrayList<>();
        List<FlagTableQuestionPatient> list=flagTableQuestionPatientRepository.findByPatientInfo(patientInfoRepository.findPatientInfoByPtRegNo(id));
        Set<Questions> setQ=new HashSet<>();
        for(FlagTableQuestionPatient f:list)
        {
            setQ.add(f.getQuestion());
        }
        for(Questions q:questions)
        {
            QuestionsDTO obj=new QuestionsDTO();
            obj.setQueryId(q.getQueryId());
            obj.setIsUrgent(q.getIsUrgent());
            obj.setFlagCount(q.getFlagCount());
            obj.setAnswers(q.getAnswers());
            obj.setQueryContent(q.getQueryContent());
            obj.setFlagged(setQ.contains(q));
            qs.add(obj);
        }
        return ResponseEntity.ok(qs);
//        return ResponseEntity.ok().body(questions);
    }

    @GetMapping("/getAnswerPatient")
    @PreAuthorize("hasAuthority('Patient')")
    public ResponseEntity<List<QandAnswerDTO>> getAnswerPatient(HttpServletRequest req,@RequestParam Integer qId){
        String token = Utilities.resolveToken(req);
        if(token==null)
            return ResponseEntity.badRequest().build();
        int id = jwtService.extractId(req,"patientId");
        PatientInfo patientInfo=patientInfoRepository.findPatientInfoByPtRegNo(id);

        Questions question= questionsRepository.findById(qId).orElse(null);
        if(question==null)
            return ResponseEntity.badRequest().build();
        List<Answers> answersList=answersRepository.findAnswersByQuery(question);
        List<FlagTableAnswerPatient> flagged=flagTableAnswerPatientRepository.findByPatientInfo(patientInfo);
        Set<Answers> flaggedAnswer=new HashSet<>();
        for(FlagTableAnswerPatient fp:flagged)
        {
            flaggedAnswer.add(fp.getAnswers());
        }

        List<UpVoteAnswerPatient> upVoteAnswerPatientList=upVoteAnswerPatientRepository.findUpVoteAnswerPatientByPatientInfo(patientInfo);
        Set<Answers> upVoted=new HashSet<>();
        for(UpVoteAnswerPatient u:upVoteAnswerPatientList)
        {
            upVoted.add(u.getAnswers());
        }

        List<QandAnswerDTO> answerDTOList=new ArrayList<>();
        for(Answers ans:answersList)
        {
            QandAnswerDTO obj=new QandAnswerDTO();
            obj.setAnswerId(ans.getAnswerId());
            obj.setUpVote(ans.getUpVote());
            obj.setDoctorName(ans.getDrInfo().getDrFullName());
            obj.setAnswerContent(obj.getAnswerContent());
            obj.setFlagged(flaggedAnswer.contains(ans));
            obj.setUpvoted(upVoted.contains(ans));
            answerDTOList.add(obj);
        }
        return ResponseEntity.ok(answerDTOList);
    }


    //using question id
    @GetMapping("/getAnswerDoctor")
    @PreAuthorize("hasAuthority('Doctor')")
    public ResponseEntity<List<QandAnswerDoctorDTO>> getAnswerDoctor(HttpServletRequest req, @RequestParam Integer qId){
        String token = Utilities.resolveToken(req);
        if(token==null)
            return ResponseEntity.badRequest().build();
        int id=jwtService.extractId(req,"doctorId");
        DoctorInfo doctorInfo=doctorInfoRepository.findDoctorInfoByDrId(id);

        Questions question=questionsRepository.findById(qId).orElse(null);
        if(question==null)
            return ResponseEntity.notFound().build();
        List<Answers> answersList=answersRepository.findAnswersByQuery(question);

        List<FlagTableAnswerDoctor> flagTableAnswerDoctorList=flagTableAnswerDoctorRepository.findByDoctorInfo(doctorInfo);
        Set<Answers> answersSet=new HashSet<>();
        for(FlagTableAnswerDoctor s:flagTableAnswerDoctorList)
            answersSet.add(s.getAnswers());

        List<UpVoteAnswerDoctor> upVoteAnswerDoctorList=upVoteAnswerDoctorRepository.findByDoctorInfo(doctorInfo);
        Set<Answers> upVoted=new HashSet<>();
        for(UpVoteAnswerDoctor u:upVoteAnswerDoctorList)
            upVoted.add(u.getAnswers());

        List<QandAnswerDoctorDTO> answerDoctorDTOList=new ArrayList<>();
        for(Answers a:answersList)
        {
            QandAnswerDoctorDTO obj=new QandAnswerDoctorDTO();
            obj.setAnswerId(a.getAnswerId());
            obj.setUpVote(a.getUpVote());
            obj.setAnswerContent(a.getAnswerContent());
            obj.setDoctorName(a.getDrInfo().getDrFullName());
            obj.setIsEdited(a.getIsEdited());
            obj.setFlagged(answersSet.contains(a));
            obj.setUpvoted(upVoted.contains(a));
            answerDoctorDTOList.add(obj);
        }
        return ResponseEntity.ok().body(answerDoctorDTOList);
    }

    //using doctor id
    @GetMapping("/getAnswerDoctorrr")
    @PreAuthorize("hasAuthority('Doctor')")
    public ResponseEntity<List<QandAnswerDoctorDTO>> getAnswerDoctorrr(HttpServletRequest req){
        String token=Utilities.resolveToken(req);
        if(token==null)
            return ResponseEntity.notFound().build();
        int id= jwtService.extractId(req,"doctorId");
        DoctorInfo doctorInfo=doctorInfoRepository.findDoctorInfoByDrId(id);
        List<Answers> answersList=answersRepository.findAnswersByDrInfo(doctorInfo);
        List<FlagTableAnswerDoctor> flagTableAnswerDoctorList=flagTableAnswerDoctorRepository.findByDoctorInfo(doctorInfo);
        Set<Answers> answersSet=new HashSet<>();
        for(FlagTableAnswerDoctor a:flagTableAnswerDoctorList)
        {
            answersSet.add(a.getAnswers());
        }

        List<UpVoteAnswerDoctor> upVoteAnswerDoctorList=upVoteAnswerDoctorRepository.findByDoctorInfo(doctorInfo);
        Set<Answers> upVoted=new HashSet<>();
        for(UpVoteAnswerDoctor u:upVoteAnswerDoctorList)
            upVoted.add(u.getAnswers());

        List<QandAnswerDoctorDTO> answerDoctorDTOList=new ArrayList<>();
        for(Answers a:answersList)
        {
            QandAnswerDoctorDTO obj=new QandAnswerDoctorDTO();
            obj.setAnswerId(a.getAnswerId());
            obj.setUpVote(a.getUpVote());
            obj.setAnswerContent(a.getAnswerContent());
            obj.setDoctorName(a.getDrInfo().getDrFullName());
            obj.setIsEdited(a.getIsEdited());
            obj.setFlagged(answersSet.contains(a));
            obj.setUpvoted(upVoted.contains(a));
            answerDoctorDTOList.add(obj);
        }
        return ResponseEntity.ok(answerDoctorDTOList);

    }

    //this is optional (implement krr diya kyuki kuch dusra krne ko nhi tha)
    @GetMapping("/trendingAnswers")
    @PreAuthorize("hasAuthority('Doctor')")
    public ResponseEntity<List<QandAnswerDoctorDTO>> trendingAnswers(){
        List<QandAnswerDoctorDTO> answer=forumService.trendingAnswers();
        return ResponseEntity.ok().body(answer);
    }



}
