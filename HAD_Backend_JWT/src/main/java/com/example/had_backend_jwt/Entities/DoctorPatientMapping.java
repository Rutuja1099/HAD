package com.example.had_backend_jwt.Entities;

import com.example.had_backend_jwt.Configurations.AttributeEncryptor;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;


import java.util.Set;
import java.util.UUID;


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
    private Integer chatId;


    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn(name = "drId", referencedColumnName = "drId")
    private DoctorInfo doctorInfo;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ptRegNo", referencedColumnName = "ptRegNo")
    private PatientInfo patientInfo;

    @Column(name="isCurrent")
    private boolean isCurrent=true;

}
