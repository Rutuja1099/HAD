package com.example.had_backend_jwt.Models;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationRequest {
    @NonNull
    private String username;

    private String password;
}
