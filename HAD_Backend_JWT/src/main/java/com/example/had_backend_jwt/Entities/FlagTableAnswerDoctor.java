package com.example.had_backend_jwt.Entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "flagTableAnswerDoctor")
public class FlagTableAnswerDoctor {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "flagId")
    private Integer flagId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "answerId", nullable = false)
    private Answers answers;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "drId")
    private DoctorInfo doctorInfo;
}
