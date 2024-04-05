package com.example.had_backend_jwt.Repositories;

import com.example.had_backend_jwt.Entities.DoctorInfo;

import com.example.had_backend_jwt.Entities.DoctorLogin;

import com.example.had_backend_jwt.Entities.Questionnaire;
import com.example.had_backend_jwt.Models.SuggestedDoctorsListResponse;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface DoctorInfoRepository extends JpaRepository<DoctorInfo,Integer> {
    Optional<DoctorInfo> findByDrId(Integer drId);


    Optional<DoctorInfo> findByDrRegNo(Integer drRegNo);

    DoctorInfo findDoctorInfoByDrLogin(DoctorLogin doctorLogin);
    DoctorInfo findDoctorInfoByDrId(Integer id);

//    Optional<DoctorInfo> findByDrRegNo(@Param("drRegNo") Integer drRegNo);


    @Query(value = "SELECT drId,drFullName, drSpecialization, drExperience, drGender FROM doctorInfo;",nativeQuery = true)
    List<Object[]> SuggestDoctorsList();
}

