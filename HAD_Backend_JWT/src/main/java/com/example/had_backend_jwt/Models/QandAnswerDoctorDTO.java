package com.example.had_backend_jwt.Models;

import lombok.Data;

@Data
public class QandAnswerDoctorDTO {
    private Integer answerId;
    private Integer upVote;
    private String answerContent;
    private String doctorName;
    private Boolean isEdited;
    private Boolean isDeleted;
    private Boolean isFlagged;
    private boolean isUpvoted;

//    public QandAnswerDoctorDTO(Integer answerId, Integer upVote, String answerContent, String doctorName, Boolean isEdited) {
//        this.answerId = answerId;
//        this.upVote = upVote;
//        this.answerContent = answerContent;
//        this.doctorName = doctorName;
//        this.isEdited = isEdited;
//    }


    public QandAnswerDoctorDTO(Integer answerId, Integer upVote, String answerContent, String doctorName, Boolean isEdited, Boolean isFlagged, boolean isUpvoted, Boolean isDeleted) {




        this.answerId = answerId;
        this.upVote = upVote;
        this.answerContent = answerContent;
        this.doctorName = doctorName;
        this.isEdited = isEdited;
        this.isFlagged = isFlagged;
        this.isUpvoted = isUpvoted;
        this.isDeleted = isDeleted;
    }

    public boolean isUpvoted() {
        return isUpvoted;
    }

    public void setUpvoted(boolean upvoted) {
        isUpvoted = upvoted;
    }

    public Boolean getFlagged() {
        return isFlagged;
    }

    public void setFlagged(Boolean flagged) {
        isFlagged = flagged;
    }

    public QandAnswerDoctorDTO() {
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

    public Boolean getEdited() {
        return isEdited;
    }

    public void setEdited(Boolean edited) {
        isEdited = edited;
    }

    public Boolean getDeleted() {
        return isDeleted;
    }

    public void setDeleted(Boolean deleted) {
        isDeleted = deleted;
    }
}
