package com.example.had_backend_jwt.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

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
    List<Answers> answers;

//    public Questions(Integer queryId, String queryContent, PatientInfo patientInfo, Boolean isUrgent, Integer flagCount, List<Answers> answers) {
//        this.queryId = queryId;
//        this.queryContent = queryContent;
//        this.patientInfo = patientInfo;
//        this.isUrgent = isUrgent;
//        this.flagCount = flagCount;
//        this.answers = answers;
//    }
//
//    public Questions() {
//    }
}
