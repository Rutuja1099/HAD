package com.example.had_backend_jwt.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@Builder
@Table(name="answers")
public class Answers {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="answerId")
    private Integer answerId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "queryId", referencedColumnName = "queryId")
    private Questions query;

    @Column(name="answerContent")
    private String answerContent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="drId", referencedColumnName = "drId")
    private DoctorInfo drInfo;

    @Column(name="upVote")
    private Integer upVote;

    @Column(name="aflagCount")
    private Integer aflagCount;

    @Column(name="isEdited")
    private Boolean isEdited;

    public Answers(Integer answerId, Questions query, String answerContent, DoctorInfo drInfo, Integer upVote, Integer aflagCount, Boolean isEdited) {
        this.answerId = answerId;
        this.query = query;
        this.answerContent = answerContent;
        this.drInfo = drInfo;
        this.upVote = upVote;
        this.aflagCount = aflagCount;
        this.isEdited = isEdited;
    }

    public Answers() {
    }
}
