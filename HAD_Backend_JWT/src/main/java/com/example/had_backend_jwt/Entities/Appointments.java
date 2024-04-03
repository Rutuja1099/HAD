package com.example.had_backend_jwt.Entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "appointment")
public class Appointments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "appointmentId")
    private Integer appointmentId;

    @ManyToOne(cascade=CascadeType.ALL)
    @JoinColumn(name = "ptRegNo")
    private PatientInfo ptInfo;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "drId")
    private DoctorInfo drInfo;

    @Column(name = "appointmentDate")
    private String appointmentDate;

    @Column(name = "slot")
    private int slot;

    @Column(name = "timeStamp")
    private String timeStamp;


}
