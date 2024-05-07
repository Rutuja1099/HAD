package com.example.had_backend_jwt.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name="questions")
public class Questions {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="queryId")
    private Integer queryId;

    @Column(name="queryContent")
    private String queryContent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JsonBackReference
    @JoinColumn(name = "ptRegNo", referencedColumnName = "ptRegNo")
    private PatientInfo patientInfo;

    @Column(name="isUrgent")
    private Boolean isUrgent=false;

    @Column(name="flagCount")
    private Integer flagCount=0;

    @Column(name="isDeleted")
    private Boolean isDeleted=false;

    @JsonIgnore
    @OneToMany(mappedBy="query", fetch = FetchType.LAZY)
    @JsonBackReference
    private List<Answers> answers;


    @JsonIgnore
    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<FlagTableQuestionPatient> flagTableQuestionPatientList;

    @JsonIgnore
    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<FlagTableQuestionDoctor> flagTableQuestionDoctorList;

//        @OneToMany(mappedBy = "answers", fetch = FetchType.LAZY,cascade = CascadeType.ALL)
//    private List<FlagTableQuestionDoctor> flagTableQuestionDoctorList;
//
//    @OneToMany(mappedBy = "answers", fetch = FetchType.LAZY,cascade = CascadeType.ALL)
//    private List<FlagTableQuestionPatient> flagTableQuestionPatientList;

}





























