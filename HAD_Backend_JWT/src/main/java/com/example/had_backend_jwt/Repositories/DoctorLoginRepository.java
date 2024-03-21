package com.example.had_backend_jwt.Repositories;

import com.example.had_backend_jwt.Entities.DoctorLogin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface DoctorLoginRepository extends JpaRepository<DoctorLogin,Integer> {
    Optional<DoctorLogin> findByDrUsername(@Param("drUsername") String username);
}
