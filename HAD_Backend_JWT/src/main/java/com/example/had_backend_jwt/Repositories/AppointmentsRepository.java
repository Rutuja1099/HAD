package com.example.had_backend_jwt.Repositories;

import com.example.had_backend_jwt.Entities.Appointments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

public interface AppointmentsRepository extends JpaRepository<Appointments,Integer> {
    Optional<Appointments> findByDrInfoDrIdAndDateAndSlot(Integer drInfo_drId, Date date, Integer slot);

    List<Appointments> findByPatientInfoPtRegNoAndDrInfoDrIdAndDate(Integer patientInfo_ptRegNo, Integer drInfo_drId, Date date);

    List<Appointments> findByDrInfoDrId(Integer drId);

    Optional<Appointments> findByPatientInfoPtRegNoAndDrInfoDrIdAndDateAndSlot(Integer patientInfo_ptRegNo, Integer drInfo_drId, Date date, Integer slot);

}
