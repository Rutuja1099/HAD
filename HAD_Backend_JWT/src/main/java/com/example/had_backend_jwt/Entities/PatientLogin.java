package com.example.had_backend_jwt.Entities;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Data
@Table(name="patientLogin")
public class PatientLogin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ptRegNo")
    private int ptRegNo;

    @Column(name = "ptUsername",nullable = false, unique = true, length = 30)
    private String ptUsername;

    @Column(name = "ptPassword", nullable = false)
    private String ptPassword;

    @Column(name = "ptEmail", nullable = false, unique = true,length = 30)
    private String ptEmail;

    @Column(name="ptFirstTimeLogin",nullable = false)
    private Boolean ptFirstTimeLogin;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ptRegNo", referencedColumnName = "ptRegNo")
//    @JsonIgnore
    private PatientInfo ptInfo;

    public int getPtRegNo() {
        return ptRegNo;
    }

    public void setPtRegNo(int ptRegNo) {
        this.ptRegNo = ptRegNo;
    }

    public String getPtUsername() {
        return ptUsername;
    }

    public void setPtUsername(String ptUsername) {
        this.ptUsername = ptUsername;
    }

    public String getPtPassword() {
        return ptPassword;
    }

    public void setPtPassword(String ptPassword) {
        this.ptPassword = ptPassword;
    }

    public String getPtEmail() {
        return ptEmail;
    }

    public void setPtEmail(String ptEmail) {
        this.ptEmail = ptEmail;
    }

}
