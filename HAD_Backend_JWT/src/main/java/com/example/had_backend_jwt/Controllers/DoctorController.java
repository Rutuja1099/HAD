package com.example.had_backend_jwt.Controllers;

import com.example.had_backend_jwt.Entities.DoctorInfo;
import com.example.had_backend_jwt.Entities.DoctorPatientMapping;
import com.example.had_backend_jwt.Entities.PatientInfo;
import com.example.had_backend_jwt.Models.DoctorAppointmentsResponse;
import com.example.had_backend_jwt.Repositories.DoctorInfoRepository;
import com.example.had_backend_jwt.Repositories.DoctorPatientMappingRepository;
import com.example.had_backend_jwt.Repositories.PatientProgressRepository;
import com.example.had_backend_jwt.Services.DoctorService;
import com.example.had_backend_jwt.Services.Utilities;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.had_backend_jwt.Models.*;
import com.example.had_backend_jwt.JWT.*;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("/suhrud/doctor")
public class DoctorController {
    @Autowired
    private DoctorService doctorService;

    @Autowired
    private final JwtService jwtService;
    @Autowired
    private DoctorInfoRepository doctorInfoRepository;
    @Autowired
    private DoctorPatientMappingRepository doctorPatientMappingRepository;
    @Autowired
    private PatientProgressRepository patientProgressRepository;

    @GetMapping("/viewAppointments/current")
    @PreAuthorize("hasAuthority('Doctor')")
    public ResponseEntity<List<DoctorAppointmentsResponse>> viewCurrentAppointments(HttpServletRequest request){
        List<DoctorAppointmentsResponse> responses=doctorService.fetchCurrentAppointments(request);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/viewAppointments/upcoming")
    @PreAuthorize("hasAuthority('Doctor')")
    public ResponseEntity<List<DoctorAppointmentsResponse>> viewUpcomingAppointments(HttpServletRequest request){
        List<DoctorAppointmentsResponse> responses=doctorService.fetchUpcomingAppointments(request);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/viewAppointments/previous")
    @PreAuthorize("hasAuthority('Doctor')")
    public ResponseEntity<List<DoctorAppointmentsResponse>> viewPreviousAppointments(HttpServletRequest request){
        List<DoctorAppointmentsResponse> responses=doctorService.fetchPreviousAppointments(request);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/viewPatients/fetchPatientProgressInfo")
    @PreAuthorize("hasAuthority('Doctor')")
    public ResponseEntity<List<PatientProgressInfo>> fetchPatientProgressInfo(HttpServletRequest request){
        List<PatientProgressInfo> patientProgressInfos=doctorService.fetchPatientProgressInfo(request);
        return ResponseEntity.ok(patientProgressInfos);
    }

    @GetMapping("/viewPatients/fetchPatientProgressInfo/patientDetail")
    @PreAuthorize("hasAuthority('Doctor')")
    public ResponseEntity<PatientDetailDTO> getPatientDetailById(HttpServletRequest request,@RequestParam Integer id)
    {
        PatientDetailDTO detail=doctorService.getPatientDetailById(request,id);
        if(detail.equals(null)){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(detail);
    }

    @PutMapping("/editDoctor")
    @PreAuthorize("hasAuthority('Doctor') or hasAuthority('Moderator') ")
    public ResponseEntity<String> editDoctor(HttpServletRequest request, @RequestBody DoctorEditRequest doctorEdit){
        boolean status= doctorService.editDoctor(request, doctorEdit);
        System.out.println("Status: "+status);
        if(status)
            return ResponseEntity.ok("Updated Successfully");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Some error has occurred.");
    }


    @PostMapping("/logout")
    @PreAuthorize("hasAuthority('Doctor')")
    public ResponseEntity<?> logoutUser(HttpServletRequest request){
        jwtService.addToBlacklist(request);
        return ResponseEntity.ok("Successfully logged out");
    }


    @GetMapping("/getDrId")
    @PreAuthorize("hasAuthority('Doctor') or hasAuthority('Moderator')")
    public ResponseEntity<Integer> getDrId(HttpServletRequest request){
        Integer drId= jwtService.extractId(request,"doctorId");
        return ResponseEntity.ok(drId);
    }

    @GetMapping("/doctorInfo")
    @PreAuthorize("hasAuthority('Doctor') or hasAuthority('Moderator')")
    public ResponseEntity<DoctorInformationDTO> getDoctorInformation(HttpServletRequest request) {
        Integer drId=jwtService.extractId(request,"doctorId");
        DoctorInformationDTO ans=doctorService.getDoctorInformation(drId);
        if(ans==null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(ans);
    }

    @GetMapping("/doctorDashboardGraph")
    @PreAuthorize("hasAuthority('Doctor')")
    public ResponseEntity<List<DashBoardGraphDTO>> getDoctorDashboardGraph(HttpServletRequest req){
        String token= Utilities.resolveToken(req);
        if(token==null)
            return ResponseEntity.badRequest().build();
        int id= jwtService.extractId(req,"doctorId");
        DoctorInfo doctorInfo=doctorInfoRepository.findDoctorInfoByDrId(id);
        if(doctorInfo==null)
            return ResponseEntity.notFound().build();
        List<DoctorPatientMapping> doctorPatientMappings=doctorPatientMappingRepository.findByDoctorInfo(doctorInfo);
        Set<PatientInfo> patientInfoSet=new HashSet<>();
        for(DoctorPatientMapping p:doctorPatientMappings)
            patientInfoSet.add(p.getPatientInfo());

        int mini=0,mild=0,mod=0,modSev=0,sev=0;
        List<Object[]> patientInfoBySeverity=patientProgressRepository.findAverageSeverityByPatientInfo();

        for(int i=0;i<patientInfoBySeverity.size();i++)
        {
            PatientInfo pInfo=(PatientInfo) patientInfoBySeverity.get(i)[1];
            if(patientInfoSet.contains(pInfo))
            {
                Double avgSeverity=(Double)patientInfoBySeverity.get(i)[0];
                if(avgSeverity<=4.0)
                    mini++;
                else if(avgSeverity<=9.0)
                    mild++;
                else if(avgSeverity<=14.0)
                    mod++;
                else if(avgSeverity<=19.0)
                    modSev++;
                else
                    sev++;
            }
        }
        List<DashBoardGraphDTO> ans=new ArrayList<>();
        ans.add(new DashBoardGraphDTO("Minimal Depression",mini));
        ans.add(new DashBoardGraphDTO("Mild Depression",mild));
        ans.add(new DashBoardGraphDTO("Moderate Depression",mod));
        ans.add(new DashBoardGraphDTO("Moderately Severe Depression",modSev));
        ans.add(new DashBoardGraphDTO("Severe Depression",sev));
        return ResponseEntity.ok(ans);
    }

}
