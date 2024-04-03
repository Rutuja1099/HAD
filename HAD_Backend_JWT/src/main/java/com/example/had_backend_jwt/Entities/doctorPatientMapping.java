package com.example.had_backend_jwt.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@Builder

@Table(name="doctorPatientMapping")
public class doctorPatientMapping {
    @Id
    @Column(name="userId")
    private Integer userId;

   @ManyToMany(fetch = FetchType.LAZY)
   @JoinColumn(name="drId", referencedColumnName = "drId")
    private Set<DoctorInfo> drInfo;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinColumn(name="ptRegNo", referencedColumnName = "ptRegNo")
    private Set<PatientInfo> ptInfo;
}
