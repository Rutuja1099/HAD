package com.example.had_backend_jwt.Repositories;

import com.example.had_backend_jwt.Entities.AdminLogin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface AdminLoginRepository extends JpaRepository<AdminLogin,Integer> {
    Optional<AdminLogin> findByAdminUsername(@Param("adminUsername") String adminUsername);
}
