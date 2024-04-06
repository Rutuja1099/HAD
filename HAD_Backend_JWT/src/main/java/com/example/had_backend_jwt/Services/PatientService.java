package com.example.had_backend_jwt.Services;

import com.example.had_backend_jwt.Entities.*;
import com.example.had_backend_jwt.JWT.JwtService;
import com.example.had_backend_jwt.Models.AnswersDTO;
import com.example.had_backend_jwt.Models.AppointmentBookingRequest;
import com.example.had_backend_jwt.Models.BookedDaysResponse;
import com.example.had_backend_jwt.Repositories.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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

    public PatientInfo getPatientInfo(Integer id){
        Optional<PatientInfo> patientInfoOptional=patientInfoRepository.findByPtRegNo(id);
        return patientInfoOptional.orElse(null);
    }

    @Transactional
    public boolean deletePatient(HttpServletRequest request) {
        Integer id = jwtService.extractId(request,"patientId");
        Optional<PatientLogin> userOptional = patientLoginRepository.findById(id);
        if (userOptional.isPresent()) {
            PatientLogin user = userOptional.get();
            Optional<PatientInfo> patientInfoOptional = patientInfoRepository.findById(id);
            if (patientInfoOptional.isPresent()) {
                patientInfoRepository.deleteById(id);
            }
            patientLoginRepository.delete(user);
            return true;
        } else {
            return false;
        }
    }

    public boolean updatePatient(PatientInfo user, PatientInfo updatedPatient) {
        try{
            user.setPtFullname(updatedPatient.getPtFullname());
            user.setPtPhone(updatedPatient.getPtPhone());
            user.setPtAddr(updatedPatient.getPtAddr());
            user.setPtDOB(updatedPatient.getPtDOB());
            user.setPtGender(updatedPatient.getPtGender());
            patientInfoRepository.save(user);
            return true;
        }
        catch (Exception e){
            return false;
        }
    }

    public List<Questionnaire> getQuestions() {
        List<Questionnaire> questions=new ArrayList<>();
        Questionnaire q1=qrepo.findQuestionnaireBySeverity(1);
        Questionnaire q2=qrepo.findQuestionnaireBySeverity(2);
        Questionnaire q3=qrepo.findQuestionnaireBySeverity(3);
        Questionnaire q4=qrepo.findQuestionnaireBySeverity(4);
        Questionnaire q5=qrepo.findQuestionnaireBySeverity(5);
        questions.add(q1);
        questions.add(q2);
        questions.add(q3);
        questions.add(q4);
        questions.add(q5);
        return questions;
    }

    public int calcSeverity(AnswersDTO answersDTO) {

        int sum = (int)answersDTO.getV1() + (int)answersDTO.getV2() + (int)answersDTO.getV3() + (int)answersDTO.getV4() + (int)answersDTO.getV5();

        return sum;
    }

    public BookedDaysResponse fetchBookedDays(HttpServletRequest httpRequest,AppointmentBookingRequest request){
        //booked->true, free->false
        Integer[] slots={1,2,3,4,5,6,7,8,9};
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
            List<Integer> requestedSlots=request.getRequestedSlots();
            for(Integer slot: slots){
                for(Integer reqSlot: requestedSlots){
                    if(Objects.equals(slot, reqSlot)){
                        List<Appointments> appointments=appointmentsRepository.findByDrInfoDrIdAndDateAndSlot(drId,requestedDateSQL,reqSlot);
                        if(!appointments.isEmpty()) {
                            bookedSlots.put(slot,true);
                            for(Appointments appointment:appointments)
                                if(Objects.equals(appointment.getPatientInfo().getPtRegNo(), ptRegNo))
                                    myBookedSlots.add(slot);
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

    public boolean checkDoctorPatientMapping(Integer ptRegNo, Integer drId){
        Optional<DoctorPatientMapping> doctorPatientMappingOptional=doctorPatientMappingRepository.findByPatientInfoPtRegNoAndDoctorInfo_DrId(ptRegNo,drId);
        return doctorPatientMappingOptional.isPresent();
    }

    public boolean checkAppointment(Integer ptRegNo,Integer drId,Date date,Integer slot){
        Optional<Appointments> appointments=appointmentsRepository.findByPatientInfoPtRegNoAndDrInfoDrIdAndDateAndSlot(ptRegNo, drId, date, slot);
        return appointments.isPresent();
    }

    public Integer bookAppointment(HttpServletRequest request,AppointmentBookingRequest appointmentBookingRequest){
        //if slots given in a list: check for each slot if already booked and then send a return code with appropriate response.

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
            List<Integer> requestedSlots=appointmentBookingRequest.getRequestedSlots();

            for(Integer slot:availableSlots) {
                for (Integer requestSlot : requestedSlots) {
                    if (Objects.equals(slot, requestSlot)) {

                        //mapping in doctorPatientMapping does not exist
                        if (!checkDoctorPatientMapping(ptRegNo, doctorInfo.getDrId())) {
                            DoctorPatientMapping doctorPatientMapping = DoctorPatientMapping.builder()
                                    .doctorInfo(doctorInfo)
                                    .patientInfo(patientInfo)
                                    .build();
                            doctorPatientMappingRepository.save(doctorPatientMapping);
                        }

                        //mapping exists
                        if (checkAppointment(ptRegNo, doctorInfo.getDrId(), Date.valueOf(appointmentBookingRequest.getRequestedDate()), requestSlot))
                            return -1;

                        else if (!checkAppointment(ptRegNo, doctorInfo.getDrId(), Date.valueOf(appointmentBookingRequest.getRequestedDate()), requestSlot)) {
                            Appointments appointments = Appointments.builder()
                                    .patientInfo(patientInfo)
                                    .drInfo(doctorInfo)
                                    .date(Date.valueOf(appointmentBookingRequest.getRequestedDate()))
                                    .slot(requestSlot)
                                    .timestamp(appointmentBookingRequest.getCurrentDate())
                                    .build();
                            appointmentsRepository.save(appointments);
                            flag=1;
                        }

                    }

                }
            }
            if(flag==1)
                return 1;
            else
                return -1;
        }
    }

}
