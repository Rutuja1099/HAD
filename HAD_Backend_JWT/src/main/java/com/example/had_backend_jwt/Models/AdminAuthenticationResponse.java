package com.example.had_backend_jwt.Models;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
@Builder
public class AdminAuthenticationResponse {
    String token;
    String message;
}
