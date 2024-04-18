package com.example.had_backend_jwt.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.had_backend_jwt.Entities.DoctorPatientMapping;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface DoctorPatientMappingRepository extends JpaRepository<DoctorPatientMapping,Integer> {
    Optional<DoctorPatientMapping> findByPatientInfoPtRegNoAndDoctorInfo_DrId(Integer ptRegNo, Integer drId);

    @Query(value = "SELECT ptRegNo, chatId, drId FROM doctorpatientmapping WHERE ptRegNo = :pId",nativeQuery = true)
    List<Object[]> DoctorsList(@Param("pId") Integer pId);

    @Query(value = "SELECT ptRegNo, chatId, drId FROM doctorpatientmapping WHERE drId = :drId",nativeQuery = true)
    List<Object[]> PatientsList(@Param("drId") Integer drId);

    List<DoctorPatientMapping> findByDoctorInfo_DrId(Integer drId);
}
