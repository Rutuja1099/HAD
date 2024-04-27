package com.example.had_backend_jwt.Controllers;

import com.example.had_backend_jwt.Entities.DoctorInfo;
import com.example.had_backend_jwt.Entities.PatientInfo;
import com.example.had_backend_jwt.Entities.PatientProgress;
import com.example.had_backend_jwt.Entities.Questionnaire;
import com.example.had_backend_jwt.JWT.JwtService;
import com.example.had_backend_jwt.Models.*;
import com.example.had_backend_jwt.Repositories.DoctorInfoRepository;
import com.example.had_backend_jwt.Repositories.PatientInfoRepository;
import com.example.had_backend_jwt.Repositories.PatientProgressRepository;
import com.example.had_backend_jwt.Services.PatientService;
import com.example.had_backend_jwt.Services.Utilities;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/suhrud/patient")
public class PatientController {
    @Autowired
    private PatientService patientService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private PatientInfoRepository patientInfoRepository;
    @Autowired
    private PatientProgressRepository patientProgressRepository;
    @Autowired
    private DoctorInfoRepository doctorInfoRepository;

    @DeleteMapping("/deletePatient")
    @PreAuthorize("hasAuthority('Patient')")
    public ResponseEntity<String> deletePatient(HttpServletRequest request)
    {
        boolean userRemoved= patientService.deletePatient(request);
        if(userRemoved)
            return ResponseEntity.ok("User deleted successfully");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to perform this operation");
    }

    @PutMapping("/updatePatient")
    @PreAuthorize("hasAuthority('Patient')")
    public ResponseEntity<String> updatePatient(HttpServletRequest request, @RequestBody PatientProfileUpdation patientProfileUpdation){
       boolean status= patientService.updatePatient(request, patientProfileUpdation);
       if(status)
           return ResponseEntity.ok("Updated Successfully");
       return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Some error has occurred.");
    }

    @GetMapping("/patientInfo")
    @PreAuthorize("hasAuthority('Patient')")
    public ResponseEntity<PatientProfileUpdation> getPatientInfo(HttpServletRequest request) {
        Integer id= jwtService.extractId(request,"patientId");
        PatientProfileUpdation response= patientService.getPatientInfo(id);
        if(response.getMessage()!=null && !response.getMessage().equals("Success"))
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/getquestionnaire")
    @PreAuthorize("hasAuthority('Patient')")
    public ResponseEntity<List<Questionnaire>> getQuestions(){
        List<Questionnaire> questions= patientService.getQuestions();
        if(questions==null)
            return ResponseEntity.notFound().build();
        return  ResponseEntity.ok(questions);
    }


    @PostMapping("/answerquestionnaire")
    @PreAuthorize("hasAuthority('Patient')")
    public ResponseEntity<String> getQuestions(HttpServletRequest req,@RequestBody AnswersDTO answersDTO){
        Integer id= jwtService.extractId(req,"patientId");
        boolean severity= patientService.calcSeverity(id,answersDTO);
        if(severity)
            return  ResponseEntity.ok("Successfully posted");
        return ResponseEntity.badRequest().body("Failed");
    }

    @PostMapping("/fetchAllBookedSlots")
    @PreAuthorize("hasAnyAuthority('Patient')")
    public ResponseEntity<BookedDaysResponse> fetchAllBookedSlots(HttpServletRequest httpServletRequest,@RequestBody AppointmentBookingRequest request){
        System.out.println("Request body : "+request);
        BookedDaysResponse bookedDays=patientService.fetchAllBookedAppointments(httpServletRequest,request);
        return ResponseEntity.ok(bookedDays);
    }

    @PostMapping("/chooseDoctor")
    @PreAuthorize("hasAnyAuthority('Patient')")
    public ResponseEntity<String> chooseDoctor(HttpServletRequest httpServletRequest,@RequestBody ChooseDoctorRequest request){
        System.out.println("Request body : "+request);
        patientService.chooseDoctor(httpServletRequest,request);
        return ResponseEntity.ok("Doctor has been chosen by patient");
    }
    // @PostMapping("/fetchBookedDays")
    // @PreAuthorize("hasAnyAuthority('Patient')")
    // public ResponseEntity<BookedDaysResponse> fetchBookedDays(HttpServletRequest httpServletRequest,@RequestBody AppointmentBookingRequest request){
    //    // System.out.println("Request body : "+request);
    //     BookedDaysResponse bookedDays=patientService.fetchBookedDays(httpServletRequest,request);
    //     return ResponseEntity.ok(bookedDays);
    // }

    @PostMapping("/bookAppointment")
    @PreAuthorize("hasAuthority('Patient')")
    public ResponseEntity<String> bookAppointment(HttpServletRequest httpServletRequest,@RequestBody AppointmentBookingRequest request){
        Integer bookingStatus= patientService.bookAppointment(httpServletRequest,request);
        if (bookingStatus==1)
            return ResponseEntity.status(HttpStatus.OK).body("Success");
        return ResponseEntity.internalServerError().body("This appointment is already booked");
    }
    @GetMapping("/viewSuggestedDoctorsList")
    @PreAuthorize("hasAuthority('Patient')")
    public ResponseEntity<List<SuggestedDoctorsListResponse>> getSuggestedDoctorsListForAppointment(){
        List<SuggestedDoctorsListResponse> DoctorInfos=patientService.getSuggestedDoctorsList();
        return  ResponseEntity.ok(DoctorInfos);
    }

    @GetMapping("/viewSeverityWiseSuggestedDoctorsList")
    @PreAuthorize("hasAuthority('Patient')")
    public ResponseEntity<List<SuggestedDoctorsListResponse>> getViewSeverityWiseSuggestedDoctorsList(HttpServletRequest req){
        int id=jwtService.extractId(req,"patientId");
        PatientInfo patientInfo=patientInfoRepository.findPatientInfoByPtRegNo(id);
        if (patientInfo == null) {
            return ResponseEntity.notFound().build();
        }
        List<PatientProgress> patientProgressList= patientProgressRepository.findByPatientInfo(patientInfo);
        if (patientProgressList == null || patientProgressList.isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }
        int totalSeverity = patientProgressList.stream().mapToInt(PatientProgress::getSeverity).sum();
        int averageSeverity = totalSeverity / patientProgressList.size();

        if(averageSeverity<=9)
        {
            List<SuggestedDoctorsListResponse> DoctorInfos=patientService.getSuggestedDoctorsList();
            return  ResponseEntity.ok(DoctorInfos);
        }
        List<Object[]> queryResult = doctorInfoRepository.SuggestDoctorsListDesc();
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

        return ResponseEntity.ok(suggestedDoctorsListResponses);
    }

    @GetMapping("/getAllDoctorsInfo")
    @PreAuthorize("hasAuthority('Patient')")
    public ResponseEntity<List<DoctorInfo>> getDoctorsList(){
        List<DoctorInfo> DoctorInfos=patientService.getAllDoctorsList();
        return  ResponseEntity.ok(DoctorInfos);
    }

    @PostMapping("/passwordUpdation")
    @PreAuthorize("hasAuthority('Patient')")
    public ResponseEntity<String> passwordUpdation(HttpServletRequest request,@RequestBody PasswordUpdateRequest passwordUpdateRequest){
        Integer status=patientService.passwordUpdation(request,passwordUpdateRequest);
        if(status==1)
            return ResponseEntity.ok("Password is successfully updated");
        else if(status==-1)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid Password. Please check your current password");
        return ResponseEntity.internalServerError().body("Failed to update the password");
    }

    @PostMapping("/logout")
    @PreAuthorize("hasAuthority('Patient')")
    public ResponseEntity<?> logoutUser(HttpServletRequest request){
        jwtService.addToBlacklist(request);
        return ResponseEntity.ok("Successfully logged out");
    }


    @GetMapping("/getPtId")
    @PreAuthorize("hasAuthority('Patient')")
    public ResponseEntity<Integer> getPtId(HttpServletRequest request){
        Integer ptId= jwtService.extractId(request,"patientId");
        return ResponseEntity.ok(ptId);
    }

    @GetMapping("/dashboardGraph")
    @PreAuthorize("hasAuthority('Patient')")
    public ResponseEntity<List<SeverityWeek>> getDashBoardGraph(HttpServletRequest req)
    {
        int id=jwtService.extractId(req,"patientId");
        if(id==-1)
            return ResponseEntity.notFound().build();
        List<WeekWiseSeverity> patientWeekWiseSeverity=patientProgressRepository.findAverageSeverityByPatientInfoPtRegNoOrderByWeekDesc(id);
        List<SeverityWeek> ans=new ArrayList<>();
        for(WeekWiseSeverity p:patientWeekWiseSeverity){
            SeverityWeek week=new SeverityWeek();
            week.setWeek(p.getWeek());
            week.setAvgSeverity(p.getAvgSeverity());
            ans.add(0,week);
        }
//        List<SeverityWeek> patientDashboardGraphData=new ArrayList<>();
//        }
//        int j=0;
//        for(int i=ans.size()-1;i>=0 && j<4;i--,j++)
//        {
//            SeverityWeek week=new SeverityWeek();
//            week.setWeek(ans.get(i).getWeek());
//            week.setAvgSeverity(ans.get(i).getAvgSeverity());
//            patientDashboardGraphData.add(0,week);
//            j++;
//        }
        return ResponseEntity.ok(ans.subList(Math.max(0,ans.size()-4),ans.size()));
    }


}
