package com.example.had_backend_jwt.Services;

import com.example.had_backend_jwt.Entities.*;
import com.example.had_backend_jwt.JWT.JwtService;
import com.example.had_backend_jwt.Models.AnswersDTO;
import com.example.had_backend_jwt.Models.PatientAuthenticationResponse;
import com.example.had_backend_jwt.Models.QandAnswerDTO;
import com.example.had_backend_jwt.Models.QandAnswerDoctorDTO;
import com.example.had_backend_jwt.Repositories.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class pService {
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final PatientLoginRepository patientLoginRepository;
    private final PatientInfoRepository patientInfoRepository;
    private final AuthenticationManager authenticationManager;
    private final QuestionnaireRepository qrepo;
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
    private final DoctorLoginRepository doctorLoginRepository;
    private final DoctorInfoRepository doctorInfoRepository;

    public PatientInfo getPatientInfo(String username){
        PatientLogin plogin=patientLoginRepository.findByPtUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User name not found"));
        System.out.println(plogin.getPtUsername());
        return plogin.getPtInfo();
    }

    @Transactional
    public boolean deletePatient(int id) {
        Optional<PatientLogin> userOptional = patientLoginRepository.findById(id);
        if (userOptional.isPresent()) {
            PatientLogin user = userOptional.get();
            Optional<PatientInfo> patientInfoOptional = patientInfoRepository.findById(id);
            if (patientInfoOptional.isPresent()) {
                patientInfoRepository.deleteById(id);
            }
            patientLoginRepository.delete(user);
            return true;
        } else {
            return false;
        }
    }

    public boolean updatePatient(PatientInfo user, PatientInfo updatedPatient) {
        try{
            user.setPtFullname(updatedPatient.getPtFullname());
            user.setPtPhone(updatedPatient.getPtPhone());
            user.setPtAddr(updatedPatient.getPtAddr());
            user.setPtDOB(updatedPatient.getPtDOB());
            user.setPtGender(updatedPatient.getPtGender());
            patientInfoRepository.save(user);
            return true;
        }
        catch (Exception e){
            return false;
        }
    }

    public List<Questionnaire> getQuestions() {
        List<Questionnaire> questions=new ArrayList<>();
        Questionnaire q1=qrepo.findQuestionnaireBySeverity(1);
        Questionnaire q2=qrepo.findQuestionnaireBySeverity(2);
        Questionnaire q3=qrepo.findQuestionnaireBySeverity(3);
        Questionnaire q4=qrepo.findQuestionnaireBySeverity(4);
        Questionnaire q5=qrepo.findQuestionnaireBySeverity(5);
        questions.add(q1);
        questions.add(q2);
        questions.add(q3);
        questions.add(q4);
        questions.add(q5);
        return questions;
    }

    public int calcSeverity(AnswersDTO answersDTO) {

        int sum = (int)answersDTO.getV1() + (int)answersDTO.getV2() + (int)answersDTO.getV3() + (int)answersDTO.getV4() + (int)answersDTO.getV5();

        return sum;
    }


    public boolean postQuestion(int id, String question) {
        try{
            PatientInfo pInfo = patientInfoRepository.findById(id).orElse(null);
            if (pInfo == null)
                return false;
            Questions q = new Questions();
            q.setQueryContent(question);
            q.setPatientInfo(pInfo);
            questionRepository.save(q);
            return true;
        }
        catch(Exception e){
            return false;
        }
    }

    public List<Questions> getMyQuestions(int id) {
        PatientInfo pInfo=patientInfoRepository.findById(id).orElse(null);
        if(pInfo==null)
            return new ArrayList<>();
        return questionRepository.findQuestionsByPatientInfo(pInfo);
    }

    public List<QandAnswerDTO> getAnswerPatient(Questions question) {
        if(question==null)
            return Collections.emptyList();
        List<Answers> ans=answerRepository.findAnswersByQuery(question);
        List<QandAnswerDTO> answer=new ArrayList<>();
        for(int i=0;i<ans.size();i++)
        {
            QandAnswerDTO qna=new QandAnswerDTO();
            qna.setAnswerId(ans.get(i).getAnswerId());
            qna.setAnswerContent(ans.get(i).getAnswerContent());
            qna.setDoctorName(ans.get(i).getDrInfo().getDrFullName());
            qna.setUpVote(ans.get(i).getUpVote());
            answer.add(qna);
        }
        return answer;
    }

    public List<QandAnswerDoctorDTO> getAnswerDoctor(Questions question) {
        if(question==null)
            return Collections.emptyList();
        List<Answers> ans=answerRepository.findAnswersByQuery(question);
        List<QandAnswerDoctorDTO> answer=new ArrayList<>();
        for(int i=0;i<ans.size();i++)
        {
            QandAnswerDoctorDTO qna=new QandAnswerDoctorDTO();
            qna.setAnswerId(ans.get(i).getAnswerId());
            qna.setAnswerContent(ans.get(i).getAnswerContent());
            qna.setDoctorName(ans.get(i).getDrInfo().getDrFullName());
            qna.setUpVote(ans.get(i).getUpVote());
            qna.setIsEdited(ans.get(i).getIsEdited());
            answer.add(qna);
        }
        return answer;
    }

    public List<QandAnswerDoctorDTO> getAnswerDoctorrr(String username) {
        DoctorLogin doctorLogin=doctorLoginRepository.findByDrUsername(username).orElse(null);
        DoctorInfo drInfo=doctorInfoRepository.findDoctorInfoByDrLogin(doctorLogin);
        List<Answers> ans=answerRepository.findAnswersByDrInfo(drInfo);
        List<QandAnswerDoctorDTO> answer=new ArrayList<>();
        for(int i=0;i<ans.size();i++)
        {
            QandAnswerDoctorDTO qna=new QandAnswerDoctorDTO();
            qna.setAnswerId(ans.get(i).getAnswerId());
            qna.setAnswerContent(ans.get(i).getAnswerContent());
            qna.setDoctorName(ans.get(i).getDrInfo().getDrFullName());
            qna.setUpVote(ans.get(i).getUpVote());
            qna.setIsEdited(ans.get(i).getIsEdited());
            answer.add(qna);
        }
        return answer;
    }

//    public List<Answers> trendingQuestions() {
//        List<Answers> ans= answerRepository.getAllByOrderByUpVoteDesc();
//        return ans;
//    }

    public List<QandAnswerDoctorDTO> trendingAnswers() {
        List<Answers> ans= answerRepository.getAllByOrderByUpVoteDesc();
        List<QandAnswerDoctorDTO> answer=new ArrayList<>();
        for(int i=0;i<ans.size();i++)
        {
            QandAnswerDoctorDTO qna=new QandAnswerDoctorDTO();
            qna.setAnswerId(ans.get(i).getAnswerId());
            qna.setAnswerContent(ans.get(i).getAnswerContent());
            qna.setDoctorName(ans.get(i).getDrInfo().getDrFullName());
            qna.setUpVote(ans.get(i).getUpVote());
            qna.setIsEdited(ans.get(i).getIsEdited());
            answer.add(qna);
        }
        return answer;
    }
}
