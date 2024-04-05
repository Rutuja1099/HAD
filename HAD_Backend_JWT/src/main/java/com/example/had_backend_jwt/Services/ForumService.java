package com.example.had_backend_jwt.Services;

import com.example.had_backend_jwt.Entities.Answers;
import com.example.had_backend_jwt.Repositories.AnswersRepository;
import com.example.had_backend_jwt.Repositories.DoctorInfoRepository;
import com.example.had_backend_jwt.Repositories.QuestionsRepository;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@NoArgsConstructor
public class ForumService {

    @Autowired
    private DoctorInfoRepository doctorInfoRepository;

    @Autowired
    private QuestionsRepository questionsRepository;

    @Autowired
    private AnswersRepository answersRepository;
    public static boolean postAnswers(Integer id, Integer queryId, String content) {
        try{

            Answers newAnswer=Answers.builder()
                    .query(questionsRepository.findQuestionsByQueryId(queryId))
                    .answerContent(content)
                    .drInfo(doctorInfoRepository.findByDrId(id))
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
