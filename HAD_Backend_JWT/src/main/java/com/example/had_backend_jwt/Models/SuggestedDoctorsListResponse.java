package com.example.had_backend_jwt.Models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SuggestedDoctorsListResponse {

    private Integer drId;

    private String drFullName;

    private String drSpecialization;

    private Integer drExperience;

    private String drGender;

//    private String drImage;

}
