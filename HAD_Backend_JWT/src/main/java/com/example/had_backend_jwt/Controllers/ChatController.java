package com.example.had_backend_jwt.Controllers;

import com.example.had_backend_jwt.Models.DoctorListChatDTO;
import com.example.had_backend_jwt.Models.PatientListChatDTO;
import com.example.had_backend_jwt.Services.ChatService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/suhrud/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @GetMapping("/getMappedDoctors")
    @PreAuthorize("hasAuthority('Patient')")
    public ResponseEntity<List<DoctorListChatDTO>> getDoctorsList(HttpServletRequest req, @RequestParam Integer pId){
        List<DoctorListChatDTO> DoctorInfos = chatService.getDoctorsList(pId);
        return  ResponseEntity.ok(DoctorInfos);
    }


    @GetMapping("/getMappedPatients")
    @PreAuthorize("hasAuthority('Doctor')")
    public ResponseEntity<List<PatientListChatDTO>> getPatientsList(HttpServletRequest req, @RequestParam Integer drId){
        List<PatientListChatDTO> PatientInfos = chatService.getPatientsList(drId);
        return  ResponseEntity.ok(PatientInfos);
    }

}
