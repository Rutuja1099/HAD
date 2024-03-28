package com.example.had_backend_jwt.Repositories;

import com.example.had_backend_jwt.Entities.PatientProgress;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientProgressRepository extends JpaRepository<PatientProgress, Integer> {
}
