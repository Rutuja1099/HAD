package com.example.had_backend_jwt.Repositories;

import com.example.had_backend_jwt.Entities.DoctorInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface DoctorInfoRepository extends JpaRepository<DoctorInfo,Integer> {
    Optional<DoctorInfo> findByDrRegno(@Param("drRegno") Integer drRegno);
}
