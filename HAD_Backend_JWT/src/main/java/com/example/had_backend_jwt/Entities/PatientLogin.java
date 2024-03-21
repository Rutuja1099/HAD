package com.example.had_backend_jwt.Entities;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name="patientLogin")
public class PatientLogin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ptLoginId")
    private Integer ptLoginId;

    @OneToOne
    @JoinColumn(name = "ptRegNo", referencedColumnName = "ptRegNo")
    private PatientInfo ptInfo;


    @Column(name="ptUsername",nullable = false,unique = true)
    private String ptUsername;

    @Column(name="ptPassword",nullable = false)
    private String ptPassword;

    public String getUsername() {
        return ptUsername;
    }

    public String getPassword() {
        return ptPassword;
    }
}
