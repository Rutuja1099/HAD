package com.example.had_backend_jwt.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name="answers")
public class Answers {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="answerId")
    private Integer answerId;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "queryId", referencedColumnName = "queryId")
    private Questions query;

    @Column(name="answerContent")
    private String answerContent;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="drId", referencedColumnName = "drId")
    private DoctorInfo drInfo;

    @Column(name="upVote")
    private Integer upVote;

    @Column(name="aflagCount")
    private Integer aflagCount;

    @Column(name="isEdited")
    private Boolean isEdited;


    @JsonIgnore
    @OneToMany(mappedBy = "answers", fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private List<FlagTableAnswerPatient> flagTableAnswerPatientList;

    @JsonIgnore
    @OneToMany(mappedBy = "answers", fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private List<FlagTableAnswerDoctor> flagTableAnswerDoctorList;


    @JsonIgnore
    @OneToMany(mappedBy = "answers", fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private List<UpVoteAnswerPatient> upVoteAnswerPatientList;

    @JsonIgnore
    @OneToMany(mappedBy = "answers", fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private List<UpVoteAnswerDoctor> upVoteAnswerDoctorList;


    public Boolean getDeleted() {
        return isDeleted;
    }

    public void setDeleted(Boolean deleted) {
        isDeleted = deleted;
    }

    @Column(name="isDeleted")
    private Boolean isDeleted=false;

}
