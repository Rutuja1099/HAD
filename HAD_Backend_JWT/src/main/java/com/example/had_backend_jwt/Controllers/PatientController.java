package com.example.had_backend_jwt.Controllers;

import com.example.had_backend_jwt.Entities.PatientInfo;
import com.example.had_backend_jwt.Entities.Questionnaire;
import com.example.had_backend_jwt.JWT.JwtService;
import com.example.had_backend_jwt.Models.AnswersDTO;
import com.example.had_backend_jwt.Models.AppointmentBookingRequest;
import com.example.had_backend_jwt.Models.BookedDaysResponse;
import com.example.had_backend_jwt.Repositories.PatientInfoRepository;
import com.example.had_backend_jwt.Services.PatientService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/suhrud/patient")
public class PatientController {
    @Autowired
    private PatientService patientService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private PatientInfoRepository patientInfoRepository;


    @DeleteMapping("/deletepatient")
    @PreAuthorize("hasAuthority('Patient')")
    public String deletePatient(HttpServletRequest request)
    {
        boolean userRemoved= patientService.deletePatient(request);
            if(userRemoved)
                return "User Deleted";
            return "error";
    }

    @PutMapping("/updatepatient")
    @PreAuthorize("hasAuthority('Patient')")
    public ResponseEntity<?> updatePatient(HttpServletRequest request, @RequestBody PatientInfo updatedPatient){
        Integer id = jwtService.extractId(request,"patientId");
            PatientInfo user=patientInfoRepository.findPatientInfoByPtRegNo(id);
            if(user==null)
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User id not found in BD");
            boolean x= patientService.updatePatient(user,updatedPatient);
            if(x)
                return ResponseEntity.ok("Updated Successfully");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Some error has occurred.");
        }

    @GetMapping("/patientinfo")
    @PreAuthorize("hasAuthority('Patient')")
    public ResponseEntity<PatientInfo> getPatientInfo(HttpServletRequest request) {
        Integer id= jwtService.extractId(request,"patientId");
        PatientInfo patientInfo = patientService.getPatientInfo(id);
            if (patientInfo != null) {
                return ResponseEntity.ok(patientInfo);
        }
        return ResponseEntity.notFound().build();
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

    @GetMapping("/fetchBookedDays")
    @PreAuthorize("hasAnyAuthority('Patient')")
    public ResponseEntity<BookedDaysResponse> fetchBookedDays(HttpServletRequest httpServletRequest,@RequestBody AppointmentBookingRequest request){
        BookedDaysResponse bookedDays=patientService.fetchBookedDays(httpServletRequest,request);
        return ResponseEntity.ok(bookedDays);
    }

    @PostMapping("/bookAppointment")
    @PreAuthorize("hasAuthority('Patient')")
    public ResponseEntity<String> bookAppointment(HttpServletRequest httpServletRequest,@RequestBody AppointmentBookingRequest request){
        Integer bookingStatus= patientService.bookAppointment(httpServletRequest,request);
        if (bookingStatus==1)
            return ResponseEntity.status(HttpStatus.OK).body("Success");
        else if(bookingStatus==0)
            return ResponseEntity.internalServerError().body("Cannot book appointment for previous day");
        return ResponseEntity.internalServerError().body("This appointment is already booked");
    }
}
