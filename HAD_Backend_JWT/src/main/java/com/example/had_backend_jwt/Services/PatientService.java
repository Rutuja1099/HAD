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
    private final PatientProgressRepository patientProgressRepository;

    private final DoctorLoginRepository doctorLoginRepository;

    public List<DoctorInfo> getAllDoctorsList(){
        return doctorInfoRepository.findAll();

    }

    public List<DoctorStatusDTO> getAllDoctorsStatus(){

        List<DoctorInfo> doctorInfos = doctorInfoRepository.findAll();
        List<DoctorStatusDTO> DoctorsListResponses = new ArrayList<>();

        for (DoctorInfo row : doctorInfos) {
            Integer drId = (Integer) row.getDrId();
            Integer drRegNo = (Integer) row.getDrRegNo();
            String drFullName = (String) row.getDrFullName();
            String drPhone = (String) row.getDrPhone();
            String drAddr = (String) row.getDrAddr();
            String drSpecialization = (String) row.getDrSpecialization();
            Integer drExperience = (Integer) row.getDrExperience();
            Integer drPatientLimit = (Integer) row.getDrPatientLimit();
            Integer drActivePatients = (Integer) row.getDrActivePatients();
            boolean drIsModerator = (boolean) row.getIsDeactivated();
            String drGender = (String) row.getDrGender();
            String drDegree = (String) row.getDrDegree();
            boolean isDeactivated = (boolean) row.getIsDeactivated();

            Optional<DoctorLogin> doctorLogin = doctorLoginRepository.findById(drId);

            if(doctorLogin.isPresent()) {
                DoctorLogin doctorLogin1 = doctorLogin.get();

                String drEmail = doctorLogin1.getDrEmail();

                DoctorStatusDTO response = DoctorStatusDTO.builder()
                        .drId(drId)
                        .drRegNo(drRegNo)
                        .drFullName(drFullName)
                        .drEmail(drEmail)
                        .drPhone(drPhone)
                        .drAddr(drAddr)
                        .drSpecialization(drSpecialization)
                        .drExperience(drExperience)
                        .drExperience(drExperience)
                        .drPatientLimit(drPatientLimit)
                        .drActivePatients(drActivePatients)
                        .drIsModerator(drIsModerator)
                        .drGender(drGender)
                        .drDegree(drDegree)
                        .isDeactivated(isDeactivated)
                        .build();
                DoctorsListResponses.add(response);
            }
        }

        return DoctorsListResponses;

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

    public boolean calcSeverity(Integer id,AnswersDTO answersDTO) {
        PatientInfo patientInfo=patientInfoRepository.findPatientInfoByPtRegNo(id);
        if(patientInfo==null)
            return false;

        int sum = (int)answersDTO.getV1() + (int)answersDTO.getV2() + (int)answersDTO.getV3() + (int)answersDTO.getV4() + (int)answersDTO.getV5();
        String temp="";
        if(sum<=4)
            temp="Minimal Depression";
        else if(sum<=9)
            temp="Mild Depression";
        else if(sum<=14)
            temp="Moderate Depression";
        else if(sum<=19)
            temp="Moderately Severe Depression";
        else
            temp="Severe Depression";
        PatientProgress patientProgress=new PatientProgress();

        patientProgress.setSeverity(sum);
        patientProgress.setPatientInfo(patientInfo);
        patientProgress.setCurrentDay(answersDTO.getCurrentDay());
        patientProgress.setCurrentWeek(answersDTO.getCurrentWeek());
        patientProgress.setSeverityType(temp);
        patientProgress.setTotalSeverity(16);
        patientProgressRepository.save(patientProgress);

        PatientLogin patientLogin=patientLoginRepository.findPatientLoginByPtInfo(patientInfo);
        patientLogin.setPtFirstTimeLogin(false);
        patientLoginRepository.save(patientLogin);
        return true;
    }

    public BookedDaysResponse fetchAllBookedAppointments(HttpServletRequest httpRequest,AppointmentBookingRequest request){
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
            List<Appointments> appointments=appointmentsRepository.findByDrInfoDrIdAndDate(drId,requestedDateSQL);
            for(Integer slot: slots){
                if (slot < requestedSlot && Objects.equals(requestedDate,currentDate)) {
                    bookedSlots.put(slot,true);
                }
                else {
                    if(Objects.equals(requestedDate,currentDate) && slot.equals(requestedSlot)){
                        bookedSlots.put(slot,true);
                    }

                    if(!appointments.isEmpty()) {
                        for(Appointments appointment:appointments) {
                            if (Objects.equals(appointment.getSlot(), slot)){
                                bookedSlots.put(slot, true);
                                if(Objects.equals(appointment.getPatientInfo().getPtRegNo(), ptRegNo) && !myBookedSlots.contains(slot))
                                    myBookedSlots.add(slot);
                            }
                        }


                    }
                }
            }

            return BookedDaysResponse.builder()
                    .myBookedSlots(myBookedSlots)
                    .bookedSlots(bookedSlots)
                    .build();
        }
    }

    public boolean fetchSpecificBookedDay(HttpServletRequest httpRequest,AppointmentBookingRequest request){
        //booked->true, free->false

        //fetch doctor id
        Integer drId=request.getDrId();

        //requested day
        LocalDate requestedDate=LocalDate.parse(request.getRequestedDate());
        LocalDate currentDate=LocalDate.now();

        //previous day
        if(requestedDate.isBefore(currentDate))
            return true;//already booked

        //current or next day
        else{
            Date requestedDateSQL=Date.valueOf(requestedDate);
            Integer requestedSlot=request.getRequestedSlots();
            Optional<Appointments> appointmentsOptional=appointmentsRepository.findByDrInfoDrIdAndDateAndSlot(drId,requestedDateSQL,requestedSlot);
            return appointmentsOptional.isPresent();
        }
    }

    public boolean checkDoctorPatientMapping(Integer ptRegNo, Integer drId){
        Optional<DoctorPatientMapping> doctorPatientMappingOptional=doctorPatientMappingRepository.findByPatientInfoPtRegNoAndDoctorInfo_DrId(ptRegNo,drId);
        return doctorPatientMappingOptional.isPresent();
    }

//    public boolean checkAppointment(Integer ptRegNo,Integer drId,Date date,Integer slot){
//        Optional<Appointments> appointments=appointmentsRepository.findByPatientInfoPtRegNoAndDrInfoDrIdAndDateAndSlot(ptRegNo, drId, date, slot);
//        return appointments.isPresent();
//    }

    public void chooseDoctor(HttpServletRequest request,ChooseDoctorRequest chooseDoctorRequest){
        Integer ptRegNo= jwtService.extractId(request,"patientId");
        PatientInfo patientInfo=patientInfoRepository.findPatientInfoByPtRegNo(ptRegNo);
        DoctorInfo doctorInfo=doctorService.getDoctorInfo(chooseDoctorRequest.getDrId());
        //mapping in doctorPatientMapping does not exist
        if (!checkDoctorPatientMapping(ptRegNo, doctorInfo.getDrId())) {
            DoctorPatientMapping doctorPatientMapping = DoctorPatientMapping.builder()
                    .doctorInfo(doctorInfo)
                    .patientInfo(patientInfo)
                    .build();
            doctorPatientMappingRepository.save(doctorPatientMapping);
        }

    }

    public Integer bookAppointment(HttpServletRequest request,AppointmentBookingRequest appointmentBookingRequest){
        //fetch all booked days
        boolean bookedSlotStatus=fetchSpecificBookedDay(request,appointmentBookingRequest);

        if(bookedSlotStatus)
            return -1;

        //current or next day
        else{
            Integer ptRegNo= jwtService.extractId(request,"patientId");

            PatientInfo patientInfo=patientInfoRepository.findPatientInfoByPtRegNo(ptRegNo);
            DoctorInfo doctorInfo=doctorService.getDoctorInfo(appointmentBookingRequest.getDrId());

            //requested slots
            Integer requestedSlot=appointmentBookingRequest.getRequestedSlots();

            //mapping in doctorPatientMapping does not exist
            if (!checkDoctorPatientMapping(ptRegNo, doctorInfo.getDrId())) {
                DoctorPatientMapping doctorPatientMapping = DoctorPatientMapping.builder()
                        .doctorInfo(doctorInfo)
                        .patientInfo(patientInfo)
                        .build();

                doctorPatientMappingRepository.save(doctorPatientMapping);

                Optional<DoctorPatientMapping> doctorPatientMapping1 = doctorPatientMappingRepository.findByPatientInfoPtRegNoAndDoctorInfo_DrId(ptRegNo, doctorInfo.getDrId());

                DoctorPatientMapping doctorPatientMapping2 = doctorPatientMapping1.get();

                doctorPatientMapping2.setChatId(doctorPatientMapping2.getUserId());

                doctorPatientMappingRepository.save(doctorPatientMapping2);

            }

            Appointments appointments = Appointments.builder()
                    .patientInfo(patientInfo)
                    .drInfo(doctorInfo)
                    .date(Date.valueOf(appointmentBookingRequest.getRequestedDate()))
                    .slot(requestedSlot)
                    .timestamp(String.valueOf(LocalDate.now()))
                    .build();
            appointmentsRepository.save(appointments);
            return 1;
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
