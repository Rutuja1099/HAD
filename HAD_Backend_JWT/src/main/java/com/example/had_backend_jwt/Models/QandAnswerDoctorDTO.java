package com.example.had_backend_jwt.Models;

import lombok.Data;

@Data
public class QandAnswerDoctorDTO {
    private Integer answerId;
    private Integer upVote;
    private String answerContent;
    private String doctorName;
    private Boolean isEdited;

    public QandAnswerDoctorDTO(Integer answerId, Integer upVote, String answerContent, String doctorName, Boolean isEdited) {
        this.answerId = answerId;
        this.upVote = upVote;
        this.answerContent = answerContent;
        this.doctorName = doctorName;
        this.isEdited = isEdited;
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
}
