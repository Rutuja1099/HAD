package com.example.had_backend_jwt.Models;

import lombok.Data;

@Data
public class QandAnswerDTO {
//    answerContent, ansId, doctorName, upVoteCount
    private Integer answerId;
    private Integer upVote;
    private String answerContent;

    private String doctorName;

    public QandAnswerDTO(Integer answerId, Integer upVote, String answerContent, String doctorName) {
        this.answerId = answerId;
        this.upVote = upVote;
        this.answerContent = answerContent;
        this.doctorName = doctorName;
    }

    public QandAnswerDTO() {
    }

    public Integer getAnswerId() {
        return answerId;
    }

    public void setAnswerId(Integer answerId) {
        this.answerId = answerId;
    }

    public Integer getUpVote() {
        return upVote;
    }

    public void setUpVote(Integer upVote) {
        this.upVote = upVote;
    }

    public String getAnswerContent() {
        return answerContent;
    }

    public void setAnswerContent(String answerContent) {
        this.answerContent = answerContent;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }
}
