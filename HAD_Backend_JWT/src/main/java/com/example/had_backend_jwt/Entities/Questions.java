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
@Table(name="questions")
public class Questions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="queryId")
    private Integer queryId;

    @Column(name="queryContent")
    private String queryContent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ptRegNo", referencedColumnName = "ptRegNo")
    private PatientInfo patientInfo;

    @Column(name="isUrgent")
    private Boolean isUrgent;

    @Column(name="flagCount")
    private Integer flagCount;

    @JsonIgnore
    @OneToMany(mappedBy="query", fetch = FetchType.LAZY)
    @JsonBackReference
    List<Answers> answers;

}
