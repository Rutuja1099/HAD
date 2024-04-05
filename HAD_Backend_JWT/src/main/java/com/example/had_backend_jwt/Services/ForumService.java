package com.example.had_backend_jwt.Services;

import com.example.had_backend_jwt.Entities.Answers;
import com.example.had_backend_jwt.Entities.DoctorInfo;
import com.example.had_backend_jwt.Entities.DoctorLogin;
import com.example.had_backend_jwt.Repositories.AnswersRepository;
import com.example.had_backend_jwt.Repositories.DoctorInfoRepository;
import com.example.had_backend_jwt.Repositories.QuestionsRepository;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@NoArgsConstructor
public class ForumService {


    private static DoctorInfoRepository doctorInfoRepository;

    private static QuestionsRepository questionsRepository;

    private static AnswersRepository answersRepository;
    public static boolean postAnswers(Integer id, Integer queryId, String content) {
        try{

            DoctorInfo doctorInfo = doctorInfoRepository.findByDrId(id)
                    .orElseThrow();

            Answers newAnswer=Answers.builder()
                    .query(questionsRepository.findQuestionsByQueryId(queryId))
                    .answerContent(content)
                    .drInfo(doctorInfo)
                    .upVote(0)
                    .aflagCount(0)
                    .isEdited(Boolean.FALSE)
                    .build();

            answersRepository.save(newAnswer);
            return true;
        }
        catch (Exception e){
            return false;
        }
    }
}
