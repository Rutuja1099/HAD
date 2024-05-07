package com.example.had_backend_jwt.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "upVoteAnswerDoctor")
public class UpVoteAnswerDoctor {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "upVoteId")
    private Integer upVoteId;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "answerId", nullable = false)
    private Answers answers;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "drId")
    private DoctorInfo doctorInfo;

}
