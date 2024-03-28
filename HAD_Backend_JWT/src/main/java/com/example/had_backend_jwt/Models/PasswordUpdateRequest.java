package com.example.had_backend_jwt.Models;

import lombok.*;

@Data
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PasswordUpdateRequest {
    private String username;
    private String currentPassword;
    private String newPassword;
}
