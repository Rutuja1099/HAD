package com.example.had_backend_jwt.Services;

import com.example.had_backend_jwt.Entities.DoctorInfo;
import com.example.had_backend_jwt.Entities.PatientInfo;
import com.example.had_backend_jwt.Entities.PatientLogin;
import com.example.had_backend_jwt.Entities.Questionnaire;
import com.example.had_backend_jwt.JWT.JwtService;
import com.example.had_backend_jwt.Models.AnswersDTO;
import com.example.had_backend_jwt.Models.PatientAuthenticationResponse;
import com.example.had_backend_jwt.Repositories.DoctorInfoRepository;
import com.example.had_backend_jwt.Repositories.PatientInfoRepository;
import com.example.had_backend_jwt.Repositories.PatientLoginRepository;
import com.example.had_backend_jwt.Repositories.QuestionnaireRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class pService {
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final PatientLoginRepository patientLoginRepository;
    private final PatientInfoRepository patientInfoRepository;
    private final AuthenticationManager authenticationManager;
    private final QuestionnaireRepository qrepo;
    private final DoctorInfoRepository doctorInfoRepository;

    public List<DoctorInfo> getSuggestedDoctorsList(){
        return doctorInfoRepository.findAll();

    }
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


}
