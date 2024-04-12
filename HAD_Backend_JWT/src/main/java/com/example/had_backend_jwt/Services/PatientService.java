package com.example.had_backend_jwt.Services;

import com.example.had_backend_jwt.Entities.*;
import com.example.had_backend_jwt.JWT.JwtService;
import com.example.had_backend_jwt.Models.*;
import com.example.had_backend_jwt.Repositories.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.had_backend_jwt.Entities.DoctorInfo;

import java.sql.Date;
import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
public class PatientService {
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final PatientLoginRepository patientLoginRepository;
    private final PatientInfoRepository patientInfoRepository;
    private final QuestionnaireRepository qrepo;
    private final AppointmentsRepository appointmentsRepository;
    private final DoctorService doctorService;
    private final DoctorPatientMappingRepository doctorPatientMappingRepository;
    private final DoctorInfoRepository doctorInfoRepository;

    public List<DoctorInfo> getAllDoctorsList(){
        return doctorInfoRepository.findAll();

    }
    public List<SuggestedDoctorsListResponse> getSuggestedDoctorsList(){
        List<Object[]> queryResult = doctorInfoRepository.SuggestDoctorsList();
        List<SuggestedDoctorsListResponse> suggestedDoctorsListResponses = new ArrayList<>();

        for (Object[] row : queryResult) {
            SuggestedDoctorsListResponse response = SuggestedDoctorsListResponse.builder()
                    .drId((Integer) row[0])
                    .drFullName((String) row[1])
                    .drSpecialization((String) row[2])
                    .drExperience((Integer) row[3])
                    .drGender((String) row[4])
                    .build();
            suggestedDoctorsListResponses.add(response);
        }

        return suggestedDoctorsListResponses;

    }
    public PatientProfileUpdation getPatientInfo(Integer id){
        Optional<PatientInfo> patientInfoOptional=patientInfoRepository.findByPtRegNo(id);
        if(patientInfoOptional.isPresent()){
            PatientInfo patientInfo=patientInfoOptional.get();
            Optional<PatientLogin> patientLoginOptional=patientLoginRepository.findById(patientInfo.getPtRegNo());
            if(patientLoginOptional.isPresent())
                return PatientProfileUpdation.builder()
                        .ptFullname(patientInfo.getPtFullname())
                        .ptEmail(patientLoginOptional.get().getPtEmail())
                        .ptDOB(patientInfo.getPtDOB())
                        .ptAddr(patientInfo.getPtAddr())
                        .ptPhone(patientInfo.getPtPhone())
                        .message("Success")
                        .build();
            return PatientProfileUpdation.builder()
                    .message("Failed to fetch the user's email")
                    .build();
        }
        return PatientProfileUpdation.builder()
                .message("User not found")
                .build();
    }

    @Transactional
    public boolean deletePatient(HttpServletRequest request) {
        // cron job to delete after a span of 3 years
        Integer ptRegNo = jwtService.extractId(request,"patientId");
        Optional<PatientInfo> patientInfoOptional=patientInfoRepository.findByPtRegNo(ptRegNo);
        if(patientInfoOptional.isPresent()){
            PatientInfo patientInfo=patientInfoOptional.get();
            patientInfo.setIsPatientDeActivated(true);
            patientInfo.setDeActivationTimestamp(String.valueOf(LocalDate.now()));
            patientInfoRepository.save(patientInfo);
            return true;
        }
        return false;
    }

    public boolean updatePatient(HttpServletRequest request, PatientProfileUpdation patientProfileUpdation) {
        Integer ptRegNo= jwtService.extractId(request,"patientId");
        Optional<PatientInfo> patientInfoOptional=patientInfoRepository.findByPtRegNo(ptRegNo);
        if(patientInfoOptional.isPresent()){
            PatientInfo patientInfo=patientInfoOptional.get();
            patientInfo.setPtFullname(patientProfileUpdation.getPtFullname());
            patientInfo.setPtDOB(patientProfileUpdation.getPtDOB());
            patientInfo.setPtAddr(patientProfileUpdation.getPtAddr());
            patientInfo.setPtPhone(patientProfileUpdation.getPtPhone());
            patientInfoRepository.save(patientInfo);

            Optional<PatientLogin> patientLoginOptional=patientLoginRepository.findById(ptRegNo);
            if(patientLoginOptional.isPresent()){
                PatientLogin patientLogin=patientLoginOptional.get();
                patientLogin.setPtEmail(patientProfileUpdation.getPtEmail());
                patientLoginRepository.save(patientLogin);
                return true;
            }else{
                return false;
            }
        }
        return false;
    }

    public List<Questionnaire> getQuestions() {

        List<Questionnaire> questions=qrepo.findQuestionnaireBySeverity();

//        List<Questionnaire> questions=new ArrayList<>();
//        Questionnaire q1=qrepo.findQuestionnaireBySeverity(1);
//        Questionnaire q2=qrepo.findQuestionnaireBySeverity(2);
//        Questionnaire q3=qrepo.findQuestionnaireBySeverity(3);
//        Questionnaire q4=qrepo.findQuestionnaireBySeverity(4);
//        Questionnaire q5=qrepo.findQuestionnaireBySeverity(5);
//        questions.add(q1);
//        questions.add(q2);
//        questions.add(q3);
//        questions.add(q4);
//        questions.add(q5);
        return questions;
    }

    public int calcSeverity(AnswersDTO answersDTO) {

        int sum = (int)answersDTO.getV1() + (int)answersDTO.getV2() + (int)answersDTO.getV3() + (int)answersDTO.getV4() + (int)answersDTO.getV5();

        return sum;
    }

    public BookedDaysResponse fetchBookedDays(HttpServletRequest httpRequest,AppointmentBookingRequest request){
        //booked->true, free->false
        Integer[] slots={1,2,3,4,5,6,7,8};
        Map<Integer,Boolean> bookedSlots= new HashMap<>();
        List<Integer> myBookedSlots=new ArrayList<>();
        Integer ptRegNo= jwtService.extractId(httpRequest,"patientId");

        //Initialize all slots
        for(Integer slot:slots)
            bookedSlots.put(slot,false);

        //fetch doctor id
        Integer drId=request.getDrId();

        //requested day
        LocalDate requestedDate=LocalDate.parse(request.getRequestedDate());
        LocalDate currentDate=LocalDate.now();

        //previous day
        if(requestedDate.isBefore(currentDate)){
            for(Integer slot:slots)
                bookedSlots.put(slot,true);
            return BookedDaysResponse.builder()
                    .bookedSlots(bookedSlots)
                    .build();
        }

        //current or next day
        else{
            Date requestedDateSQL=Date.valueOf(requestedDate);
            Integer requestedSlot=request.getRequestedSlots();
            for(Integer slot: slots){
                if(Objects.equals(slot, requestedSlot)){
                    List<Appointments> appointments=appointmentsRepository.findByDrInfoDrIdAndDateAndSlot(drId,requestedDateSQL,requestedSlot);
                    if(!appointments.isEmpty()) {
                        bookedSlots.put(slot,true);
                        for(Appointments appointment:appointments)
                            if(Objects.equals(appointment.getPatientInfo().getPtRegNo(), ptRegNo))
                                myBookedSlots.add(slot);
                    }
                }
            }

            return BookedDaysResponse.builder()
                    .myBookedSlots(myBookedSlots)
                    .bookedSlots(bookedSlots)
                    .build();
        }
    }

    public boolean checkDoctorPatientMapping(Integer ptRegNo, Integer drId){
        Optional<DoctorPatientMapping> doctorPatientMappingOptional=doctorPatientMappingRepository.findByPatientInfoPtRegNoAndDoctorInfo_DrId(ptRegNo,drId);
        return doctorPatientMappingOptional.isPresent();
    }

    public boolean checkAppointment(Integer ptRegNo,Integer drId,Date date,Integer slot){
        Optional<Appointments> appointments=appointmentsRepository.findByPatientInfoPtRegNoAndDrInfoDrIdAndDateAndSlot(ptRegNo, drId, date, slot);
        return appointments.isPresent();
    }

    public Integer bookAppointment(HttpServletRequest request,AppointmentBookingRequest appointmentBookingRequest){
        //fetch all booked days
        BookedDaysResponse bookedDaysResponse=fetchBookedDays(request,appointmentBookingRequest);
        Map<Integer,Boolean> bookedSlots=bookedDaysResponse.getBookedSlots();
        List<Integer> availableSlots=new ArrayList<Integer>();
        int countTrue=0;

        //available slots and previous day check
        for(Map.Entry<Integer,Boolean> entry: bookedSlots.entrySet()){
            Integer slot=entry.getKey();
            Boolean isBooked=entry.getValue();
            if(isBooked){
                countTrue+=1;
            }
            else
                availableSlots.add(slot);
        }

        //previous day
        if(countTrue==bookedSlots.values().size())
            return 0;

        //current or next day
        else{
            Integer ptRegNo= jwtService.extractId(request,"patientId");

            PatientInfo patientInfo=patientInfoRepository.findPatientInfoByPtRegNo(ptRegNo);
            DoctorInfo doctorInfo=doctorService.getDoctorInfo(appointmentBookingRequest.getDrId());

            int flag=0;

            //requested slots
            Integer requestedSlot=appointmentBookingRequest.getRequestedSlots();

            for(Integer slot:availableSlots) {
                if (Objects.equals(slot, requestedSlot)) {

                    //mapping in doctorPatientMapping does not exist
                    if (!checkDoctorPatientMapping(ptRegNo, doctorInfo.getDrId())) {
                        DoctorPatientMapping doctorPatientMapping = DoctorPatientMapping.builder()
                                .doctorInfo(doctorInfo)
                                .patientInfo(patientInfo)
                                .build();
                        doctorPatientMappingRepository.save(doctorPatientMapping);
                    }

                    //mapping exists
                    if (checkAppointment(ptRegNo, doctorInfo.getDrId(), Date.valueOf(appointmentBookingRequest.getRequestedDate()), requestedSlot))
                        return -1;

                    else if (!checkAppointment(ptRegNo, doctorInfo.getDrId(), Date.valueOf(appointmentBookingRequest.getRequestedDate()), requestedSlot)) {
                        Appointments appointments = Appointments.builder()
                                .patientInfo(patientInfo)
                                .drInfo(doctorInfo)
                                .date(Date.valueOf(appointmentBookingRequest.getRequestedDate()))
                                .slot(requestedSlot)
                                .timestamp(String.valueOf(LocalDate.now()))
                                .build();
                        appointmentsRepository.save(appointments);
                        flag=1;

                    }

                }
            }
            if(flag==1)
                return 1;
            else
                return -1;
        }
    }

    public Integer passwordUpdation(HttpServletRequest request,PasswordUpdateRequest passwordUpdateRequest){
        Integer ptRegNo= jwtService.extractId(request,"patientId");
        Optional<PatientLogin> patientLoginOptional=patientLoginRepository.findById(ptRegNo);
        if(patientLoginOptional.isPresent()){
            PatientLogin patientLogin=patientLoginOptional.get();
            if(passwordEncoder.matches(passwordUpdateRequest.getCurrentPassword(),patientLogin.getPtPassword())){
                patientLogin.setPtPassword(passwordEncoder.encode(passwordUpdateRequest.getNewPassword()));
                patientLoginRepository.save(patientLogin);
                return 1;
            }else
                return -1;
        }
        return 0;
    }

}
