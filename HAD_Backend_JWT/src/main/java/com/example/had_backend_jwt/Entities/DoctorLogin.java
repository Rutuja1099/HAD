package com.example.had_backend_jwt.Entities;

import com.example.had_backend_jwt.Configurations.AttributeEncryptor;
import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="doctorLogin")
public class DoctorLogin {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "drId")
    private Integer drId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "drId", referencedColumnName = "drId")
    private DoctorInfo drInfo;

    @Convert(converter = AttributeEncryptor.class)
    @Column(name="drEmail",nullable = false,unique = true)
    private String drEmail;

    @Convert(converter = AttributeEncryptor.class)
    @Column(name = "drUsername",nullable = false,unique = true)
    private String drUsername;

    @Convert(converter = AttributeEncryptor.class)
    @Column(name = "drPassword",nullable = false)
    private String drPassword;

    @Column(name="drFirstTimeLogin",nullable = false)
    private Boolean drFirstTimeLogin;
}
