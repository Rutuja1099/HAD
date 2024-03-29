package com.example.had_backend_jwt.Entities;

import jakarta.persistence.*;
import lombok.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Builder
@Table(name="adminLogin")
public class AdminLogin {
    @Id
    @Column(name="adminEmail",nullable = false,unique = true,length = 30)
    private String adminEmail;

    @Column(name="adminUsername",nullable = false,unique = true,length = 30)
    private String adminUsername;

    @Column(name="adminPassword",nullable = false)
    private String adminPassword;
}
