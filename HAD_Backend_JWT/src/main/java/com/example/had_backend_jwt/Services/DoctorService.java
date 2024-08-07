package com.example.had_backend_jwt.Services;

import com.example.had_backend_jwt.Entities.*;
import com.example.had_backend_jwt.JWT.JwtService;
import com.example.had_backend_jwt.Models.*;
import com.example.had_backend_jwt.Repositories.*;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Request;
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
    public final PatientInfoRepository patientInfoRepository;
//    public final PatientProgressRepository patientProgressRepository;

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
            doctorAppointmentsResponse.setPtRegNo(appointment.getPatientInfo().getPtRegNo());
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
            if(patientProgressOptional.isPresent() && patient.isCurrent()){
                PatientProgress patientProgress=patientProgressOptional.get();
                PatientProgressInfo patientProgressInfo=new PatientProgressInfo();
                patientProgressInfo.setPtRegNo(patient.getPatientInfo().getPtRegNo());
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

    public PatientDetailDTO getPatientDetailById(HttpServletRequest request,Integer id) {
        Integer drId= jwtService.extractId(request,"doctorId");
        PatientDetailDTO detail=new PatientDetailDTO();
        PatientInfo patientInfo=patientInfoRepository.findPatientInfoByPtRegNo(id);
        if(patientInfo==null)
            return null;
        detail.setFullname(patientInfo.getPtFullname());
//        detail.setGender(patientInfo.getPtGender());
//        detail.setPhone(patientInfo.getPtPhone());
//        detail.setDob(patientInfo.getPtDOB());

        DoctorPatientMapping doctorPatientMapping=doctorPatientMappingRepository.findByPatientInfoPtRegNoAndDoctorInfo_DrId(id,drId);
        if(doctorPatientMapping!=null){

                if(doctorPatientMapping.isCurrent()){
                    detail.setFullname(patientInfo.getPtFullname());
//                    detail.setGender(patientInfo.getPtGender());
//                    detail.setPhone(patientInfo.getPtPhone());
//                    detail.setDob(patientInfo.getPtDOB());

                    List<WeekWiseSeverity> patientWeekWiseSeverity=patientProgressRepository.findAverageSeverityByPatientInfoPtRegNoOrderByWeekDesc(id);
                    List<SeverityWeek> ans=new ArrayList<>();
                    for(WeekWiseSeverity p:patientWeekWiseSeverity){
                        SeverityWeek week=new SeverityWeek();
                        week.setWeek(p.getWeek());
                        week.setAvgSeverity(p.getAvgSeverity());
                        ans.add(0,week);
                    }
                    detail.setSeverityWeekWise(ans);
                    return detail;
                }
                return null;

        }
        return null;

    }

    public DoctorInformationDTO getDoctorInformation(Integer drId) {
        DoctorInformationDTO ans=new DoctorInformationDTO();
        DoctorInfo doctorInfo=doctorInfoRepository.findDoctorInfoByDrId(drId);
        if(doctorInfo==null)
            return null;
        ans.setDrFullName(doctorInfo.getDrFullName());
        ans.setDrDegree(doctorInfo.getDrDegree());
        ans.setDrGender(doctorInfo.getDrGender());
        ans.setDrAddr(doctorInfo.getDrAddr());
        ans.setDrPhone(doctorInfo.getDrPhone());
        ans.setDrExperience(doctorInfo.getDrExperience());
        ans.setDrRegNo(doctorInfo.getDrRegNo());
        ans.setDrActivePatients(doctorInfo.getDrActivePatients());
        ans.setDrIsModerator(doctorInfo.isDrIsModerator());
        ans.setDrPatientLimit(doctorInfo.getDrPatientLimit());
        ans.setDrSpecialization(doctorInfo.getDrSpecialization());
        return ans;
    }

    public boolean editDoctor(HttpServletRequest request, DoctorEditRequest doctorEdit) {
        Integer drId= jwtService.extractId(request,"doctorId");
        Optional<DoctorInfo> editDetails=doctorInfoRepository.findByDrId(drId);
        if(editDetails.isPresent()){
            DoctorInfo doctorInfo=editDetails.get();
            doctorInfo.setDrFullName(doctorEdit.getDrFullName());
            doctorInfo.setDrGender(doctorEdit.getDrGender());
            doctorInfo.setDrExperience(doctorEdit.getDrExperience());
            doctorInfo.setDrDegree(doctorEdit.getDrDegree());
            doctorInfo.setDrAddr(doctorEdit.getDrAddr());
            doctorInfo.setDrSpecialization(doctorEdit.getDrSpecialization());
            doctorInfo.setDrPhone(doctorEdit.getDrPhone());
            doctorInfo.setDrActivePatients(doctorEdit.getDrActivePatients());
            doctorInfo.setDrPatientLimit(doctorEdit.getDrPatientLimit());

            doctorInfoRepository.save(doctorInfo);

//            Optional<PatientLogin> patientLoginOptional=patientLoginRepository.findById(ptRegNo);
//            if(patientLoginOptional.isPresent()){
//                PatientLogin patientLogin=patientLoginOptional.get();
//                patientLogin.setPtEmail(patientProfileUpdation.getPtEmail());
//                patientLoginRepository.save(patientLogin);
//                return true;
//            }else{
//                return false;
//            }
            return true;
        }
        return false;
    }
}
