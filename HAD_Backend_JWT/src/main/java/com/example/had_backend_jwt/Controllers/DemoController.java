package com.example.had_backend_jwt.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/suhrid/hello")
public class DemoController {
    @GetMapping("/moderator")
    @PreAuthorize("hasAuthority('Moderator')")
    public ResponseEntity<String> sayHello(){
        return ResponseEntity.ok("Hello from secured endpoint");
    }

    @GetMapping("/doctor")
    @PreAuthorize("hasAuthority('Doctor')")
    public ResponseEntity<String> sayDoctor(){
        return ResponseEntity.ok("Hello Doctor");
    }

    @GetMapping("/")
    @PreAuthorize("hasAuthority('Patient')")
    public ResponseEntity<String> sayPatient(){
        return ResponseEntity.ok("Hello Patient");
    }
}

