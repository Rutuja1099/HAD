package com.example.had_backend_jwt.Controllers;

import com.example.had_backend_jwt.Entities.DoctorInfo;
import com.example.had_backend_jwt.Entities.Questionnaire;
import com.example.had_backend_jwt.JWT.JwtService;
import com.example.had_backend_jwt.Models.*;
import com.example.had_backend_jwt.Repositories.PatientInfoRepository;
import com.example.had_backend_jwt.Services.PatientService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/suhrud/patient")
public class PatientController {
    @Autowired
    private PatientService patientService;
    @Autowired
    private JwtService jwtService;

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
    public ResponseEntity<String> getQuestions(@RequestBody AnswersDTO answersDTO){
        int severity= patientService.calcSeverity(answersDTO);
        return  ResponseEntity.ok("Severity : "+severity);
    }

//    @GetMapping("/fetchBookedDays")
//    @PreAuthorize("hasAnyAuthority('Patient')")
//    public ResponseEntity<Boolean> fetchBookedDays(HttpServletRequest httpServletRequest,@RequestBody AppointmentBookingRequest request){
//        boolean bookedDays=patientService.fetchSpecificBookedDay(httpServletRequest,request);
//        return ResponseEntity.ok(bookedDays);
//    }

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
    public ResponseEntity<?> logoutUser(HttpServletRequest request){
        jwtService.addToBlacklist(request);
        return ResponseEntity.ok("Successfully logged out");
    }
}
