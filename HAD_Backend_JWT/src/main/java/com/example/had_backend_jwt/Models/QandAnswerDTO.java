package com.example.had_backend_jwt.Models;

import lombok.Data;

@Data
public class QandAnswerDTO {
//    answerContent, ansId, doctorName, upVoteCount
    private Integer answerId;
    private Integer upVote;
    private String answerContent;

    private String doctorName;

    private boolean isFlagged;
    private boolean isUpvoted;


    public QandAnswerDTO(Integer answerId, Integer upVote, String answerContent, String doctorName, boolean isFlagged, boolean isUpvoted) {
        this.answerId = answerId;
        this.upVote = upVote;
        this.answerContent = answerContent;
        this.doctorName = doctorName;
        this.isFlagged = isFlagged;
        this.isUpvoted = isUpvoted;
    }

    public boolean isUpvoted() {
        return isUpvoted;
    }

    public void setUpvoted(boolean upvoted) {
        isUpvoted = upvoted;
    }

    public boolean isFlagged() {
        return isFlagged;
    }

    public void setFlagged(boolean flagged) {
        isFlagged = flagged;
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
