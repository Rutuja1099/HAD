package com.example.had_backend_jwt.Services;

import com.example.had_backend_jwt.Entities.*;
import com.example.had_backend_jwt.Models.PatientProfileUpdation;
import com.example.had_backend_jwt.Models.QandAnswerDTO;
import com.example.had_backend_jwt.Models.QandAnswerDoctorDTO;
import com.example.had_backend_jwt.Repositories.*;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@NoArgsConstructor
public class ForumService {


    @Autowired
    private DoctorInfoRepository doctorInfoRepository;
    @Autowired
    private DoctorLoginRepository doctorLoginRepository;
    @Autowired
    private PatientInfoRepository patientInfoRepository;
    @Autowired
    private  QuestionsRepository questionsRepository;
    @Autowired
    private AnswersRepository answersRepository;
    @Autowired
    private EmailService emailService;
    @Autowired
    private PatientLoginRepository patientLoginRepository;

    public String postAnswers(Integer id, Integer queryId, String content) {
        try{

            DoctorInfo doctorInfo = doctorInfoRepository.findDoctorInfoByDrId(id);

            Answers newAnswer=Answers.builder()
                    .query(questionsRepository.findQuestionsByQueryId(queryId))
                    .answerContent(content)
                    .drInfo(doctorInfo)
                    .upVote(0)
                    .aflagCount(0)
                    .isEdited(Boolean.FALSE)
                    .isDeleted(Boolean.FALSE)
                    .build();

            answersRepository.save(newAnswer);
            return "Success";
        }
        catch (Exception e){
            return e.toString();
        }
    }

    public boolean postQuestion(int id, String question) {
        try{
            PatientInfo pInfo = patientInfoRepository.findById(id).orElse(null);
            if (pInfo == null)
                return false;
            Questions q = new Questions();
            String processedQuery=maskPersonalInfo(id,question);
            if(!processedQuery.equals(question.toLowerCase())){
                Optional<PatientLogin> patientLoginOptional=patientLoginRepository.findById(id);
                if(patientLoginOptional.isPresent()){
                    PatientLogin patientLogin=patientLoginOptional.get();
                    emailService.sendSimpleMessage(patientLogin.getPtEmail(),"Wellness Hub Query Posting","Dear user,\n To preserve your privacy we have masked the personal details present in the query. Hence the query posted now looks like this:\n"+processedQuery+"\n");
                    q.setQueryContent(processedQuery);
                }
            }
            else {
                q.setQueryContent(question);
            }
            q.setPatientInfo(pInfo);
            questionsRepository.save(q);
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
        return questionsRepository.findQuestionsByPatientInfo(pInfo);
    }

    public List<QandAnswerDTO> getAnswerPatient(Questions question) {
        if(question==null)
            return Collections.emptyList();
        List<Answers> ans=answersRepository.findAnswersByQuery(question);
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
        List<Answers> ans=answersRepository.findAnswersByQuery(question);
        List<QandAnswerDoctorDTO> answer=new ArrayList<>();
        for(int i=0;i<ans.size();i++)
        {
            QandAnswerDoctorDTO qna=new QandAnswerDoctorDTO();
            qna.setAnswerId(ans.get(i).getAnswerId());
            qna.setAnswerContent(ans.get(i).getAnswerContent());
            qna.setDoctorName(ans.get(i).getDrInfo().getDrFullName());
            qna.setUpVote(ans.get(i).getUpVote());
            qna.setIsEdited(ans.get(i).getIsEdited());
            qna.setIsDeleted(ans.get(i).getIsDeleted());
            if(!ans.get(i).getIsDeleted()){
                answer.add(qna);
            }

        }
        return answer;
    }

    public List<QandAnswerDoctorDTO> getAnswerDoctorrr(Integer id) {
//        DoctorLogin doctorLogin=doctorLoginRepository.findDoctorLoginByDrUsername(username).getDrInfo();
//        DoctorInfo drInfo=doctorLoginRepository.findDoctorLoginByDrUsername(username).getDrInfo();
//        List<Answers> ans=answersRepository.findAnswersByDrInfo(drInfo);
        DoctorInfo doctorInfo=doctorInfoRepository.findDoctorInfoByDrId(id);
        if(doctorInfo==null)
            return Collections.emptyList();
        List<Answers> ans=answersRepository.findAnswersByDrInfo(doctorInfo);
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
        List<Answers> ans= answersRepository.getAllByOrderByUpVoteDesc();
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

    public String maskPersonalInfo(int ptRegNo,String question){
        PatientInfo patientInfo=patientInfoRepository.findPatientInfoByPtRegNo(ptRegNo);
        String processedQuery=question;
        if(patientInfo!=null){
            processedQuery=processedQuery.toLowerCase()
                    .replace(patientInfo.getPtFullname().toLowerCase(),"*****")
                    .replace(patientInfo.getPtPhone(),"*****")
                    .replace(patientInfo.getPtAddr().toLowerCase(),"*****")
                    .replace(patientInfo.getPtGender().toLowerCase(),"*****");
        }
        return processedQuery;
    }
}
