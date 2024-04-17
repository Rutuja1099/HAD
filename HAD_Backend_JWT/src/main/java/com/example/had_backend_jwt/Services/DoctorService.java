package com.example.had_backend_jwt.Services;

import com.example.had_backend_jwt.Entities.Appointments;
import com.example.had_backend_jwt.Entities.DoctorInfo;
import com.example.had_backend_jwt.Entities.DoctorPatientMapping;
import com.example.had_backend_jwt.Entities.PatientProgress;
import com.example.had_backend_jwt.JWT.JwtService;
import com.example.had_backend_jwt.Models.DoctorAppointmentsResponse;
import com.example.had_backend_jwt.Models.PatientProgressInfo;
import com.example.had_backend_jwt.Repositories.AppointmentsRepository;
import com.example.had_backend_jwt.Repositories.DoctorInfoRepository;
import com.example.had_backend_jwt.Repositories.DoctorPatientMappingRepository;
import com.example.had_backend_jwt.Repositories.PatientProgressRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DoctorService {
    private final DoctorInfoRepository doctorInfoRepository;
    private final JwtService jwtService;
    private final AppointmentsRepository appointmentsRepository;
    private final DoctorPatientMappingRepository doctorPatientMappingRepository;
    private final PatientProgressRepository patientProgressRepository;

    public DoctorInfo getDoctorInfo(Integer drId){
        Optional<DoctorInfo> doctorInfo=doctorInfoRepository.findByDrId(drId);
        return doctorInfo.orElse(null);
    }

    public List<DoctorAppointmentsResponse>  fetchAllAppointments(Integer drId){
        List<DoctorAppointmentsResponse> responses=new ArrayList<>();
        List<Appointments> appointments= appointmentsRepository.findByDrInfoDrId(drId);
        for(Appointments appointment:appointments){
            DoctorAppointmentsResponse doctorAppointmentsResponse=new DoctorAppointmentsResponse();
            doctorAppointmentsResponse.setDate(appointment.getDate().toString());
            doctorAppointmentsResponse.setSlot(appointment.getSlot());
            doctorAppointmentsResponse.setPtEmail(appointment.getPatientInfo().getPtLogin().getPtEmail());
            doctorAppointmentsResponse.setPtFullName(appointment.getPatientInfo().getPtFullname());
            doctorAppointmentsResponse.setPtPhone(appointment.getPatientInfo().getPtPhone());
            doctorAppointmentsResponse.setPtGender(appointment.getPatientInfo().getPtGender());
            doctorAppointmentsResponse.setPtAddress(appointment.getPatientInfo().getPtAddr());
            responses.add(doctorAppointmentsResponse);
        }
        return responses;
    }

    public List<DoctorAppointmentsResponse> fetchCurrentAppointments(HttpServletRequest request){
        Integer drId= jwtService.extractId(request,"doctorId");
        List<DoctorAppointmentsResponse> currentAppointments=new ArrayList<>();
        List<DoctorAppointmentsResponse> allResponses=fetchAllAppointments(drId);
        for(DoctorAppointmentsResponse response:allResponses){
            LocalDate date=LocalDate.parse(response.getDate());
            if(date.equals(LocalDate.now())){
                currentAppointments.add(response);
            }
        }
        return currentAppointments;
    }

    public List<DoctorAppointmentsResponse> fetchUpcomingAppointments(HttpServletRequest request){
        Integer drId= jwtService.extractId(request,"doctorId");
        List<DoctorAppointmentsResponse> upcomingAppointments=new ArrayList<>();
        List<DoctorAppointmentsResponse> allResponses=fetchAllAppointments(drId);
        for(DoctorAppointmentsResponse response:allResponses){
            LocalDate date=LocalDate.parse(response.getDate());
            if(date.isAfter(LocalDate.now())){
                upcomingAppointments.add(response);
            }
        }
        return upcomingAppointments;
    }

    public List<DoctorAppointmentsResponse> fetchPreviousAppointments(HttpServletRequest request){
        Integer drId= jwtService.extractId(request,"doctorId");
        List<DoctorAppointmentsResponse> previousAppointments=new ArrayList<>();
        List<DoctorAppointmentsResponse> allResponses=fetchAllAppointments(drId);
        for(DoctorAppointmentsResponse response:allResponses){
            LocalDate date=LocalDate.parse(response.getDate());
            if(date.isBefore(LocalDate.now())){
                previousAppointments.add(response);
            }
        }
        return previousAppointments;
    }

    public List<PatientProgressInfo> fetchPatientProgressInfo(HttpServletRequest request){
        Integer drId= jwtService.extractId(request,"doctorId");
        List<DoctorPatientMapping> doctorPatientMappings=doctorPatientMappingRepository.findByDoctorInfo_DrId(drId);
        List<PatientProgressInfo> patientProgressInfos=new ArrayList<>();
        for(DoctorPatientMapping patient:doctorPatientMappings){
            Integer ptRegNo=patient.getPatientInfo().getPtRegNo();
            Optional<PatientProgress> patientProgressOptional=patientProgressRepository.findFirstByPatientInfoPtRegNoOrderByCurrentWeekDescCurrentDayDesc(ptRegNo);
            if(patientProgressOptional.isPresent()){
                PatientProgress patientProgress=patientProgressOptional.get();
                PatientProgressInfo patientProgressInfo=new PatientProgressInfo();
                patientProgressInfo.setPtFullname(patient.getPatientInfo().getPtFullname());
                patientProgressInfo.setCurrentWeek(patientProgress.getCurrentWeek());
                patientProgressInfo.setCurrentDay(patientProgress.getCurrentDay());
                patientProgressInfo.setTotalSeverity(patientProgress.getTotalSeverity());
                patientProgressInfo.setSeverity(patientProgress.getSeverity());
                patientProgressInfos.add(patientProgressInfo);
            }

        }
        return patientProgressInfos;
    }

}
