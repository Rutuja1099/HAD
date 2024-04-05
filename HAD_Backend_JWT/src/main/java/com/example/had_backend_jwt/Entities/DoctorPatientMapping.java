package com.example.had_backend_jwt.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;


@Entity
@Builder
@Data
@Table(name = "doctorPatientMapping")
@AllArgsConstructor
@NoArgsConstructor
public class DoctorPatientMapping {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="userId")
    private Integer userId;

    @Column(name="chatId", unique = true)
    private String chatId;

    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn(name = "drId", referencedColumnName = "drId")
    private DoctorInfo doctorInfo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ptRegNo", referencedColumnName = "ptRegNo")
    private PatientInfo patientInfo;

}
