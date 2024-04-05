package com.example.had_backend_jwt.Services;

import com.example.had_backend_jwt.Entities.Appointments;
import com.example.had_backend_jwt.Entities.DoctorInfo;
import com.example.had_backend_jwt.JWT.JwtService;
import com.example.had_backend_jwt.Models.DoctorAppointmentsResponse;
import com.example.had_backend_jwt.Repositories.AppointmentsRepository;
import com.example.had_backend_jwt.Repositories.DoctorInfoRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
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

    public DoctorInfo getDoctorInfo(Integer drId){
        Optional<DoctorInfo> doctorInfo=doctorInfoRepository.findByDrId(drId);
        return doctorInfo.orElse(null);
    }

    public List<DoctorAppointmentsResponse>  fetchAllAppointments(HttpServletRequest request){
        List<DoctorAppointmentsResponse> responses=new ArrayList<>();
        Integer drId= jwtService.extractId(request,"doctorId");
        List<Appointments> appointments= appointmentsRepository.findByDrInfoDrId(drId);
        for(Appointments appointment:appointments){
            DoctorAppointmentsResponse doctorAppointmentsResponse=new DoctorAppointmentsResponse();
            doctorAppointmentsResponse.setDate(appointment.getDate().toString());
            doctorAppointmentsResponse.setSlot(appointment.getSlot());
            doctorAppointmentsResponse.setPtEmail(appointment.getPatientInfo().getPtLogin().getPtEmail());
            doctorAppointmentsResponse.setPtFullName(appointment.getPatientInfo().getPtFullname());
            doctorAppointmentsResponse.setPtPhone(appointment.getPatientInfo().getPtPhone());
            doctorAppointmentsResponse.setPtGender(appointment.getPatientInfo().getPtGender());
            responses.add(doctorAppointmentsResponse);
        }
        return responses;
    }

    public List<DoctorAppointmentsResponse> fetchCurrentAppointments(HttpServletRequest request){
        List<DoctorAppointmentsResponse> allResponses=fetchAllAppointments(request);
        List<DoctorAppointmentsResponse> currentAppointments=new ArrayList<>();
        for(DoctorAppointmentsResponse response:allResponses){
            LocalDate date=LocalDate.parse(response.getDate());
            if(date.equals(LocalDate.now())){
                currentAppointments.add(response);
            }
        }
        return currentAppointments;
    }

    public List<DoctorAppointmentsResponse> fetchUpcomingAppointments(HttpServletRequest request){
        List<DoctorAppointmentsResponse> allResponses=fetchAllAppointments(request);
        List<DoctorAppointmentsResponse> upcomingAppointments=new ArrayList<>();
        for(DoctorAppointmentsResponse response:allResponses){
            LocalDate date=LocalDate.parse(response.getDate());
            if(date.isAfter(LocalDate.now())){
                upcomingAppointments.add(response);
            }
        }
        return upcomingAppointments;
    }

    public List<DoctorAppointmentsResponse> fetchPreviousAppointments(HttpServletRequest request){
        List<DoctorAppointmentsResponse> allResponses=fetchAllAppointments(request);
        List<DoctorAppointmentsResponse> previousAppointments=new ArrayList<>();
        for(DoctorAppointmentsResponse response:allResponses){
            LocalDate date=LocalDate.parse(response.getDate());
            if(date.isBefore(LocalDate.now())){
                previousAppointments.add(response);
            }
        }
        return previousAppointments;
    }

}
