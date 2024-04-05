package com.example.had_backend_jwt.Configurations;

import com.example.had_backend_jwt.Entities.AdminLogin;
import com.example.had_backend_jwt.Entities.DoctorLogin;
import com.example.had_backend_jwt.Entities.PatientLogin;
import com.example.had_backend_jwt.Repositories.AdminLoginRepository;
import com.example.had_backend_jwt.Repositories.DoctorLoginRepository;
import com.example.had_backend_jwt.Repositories.PatientLoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Configuration
public class ApplicationConfig implements UserDetailsService{
    private final PatientLoginRepository patientLoginRepository;
    private final DoctorLoginRepository doctorLoginRepository;
    private final AdminLoginRepository adminRepository;

    @Autowired
    public ApplicationConfig(PatientLoginRepository patientLoginRepository, DoctorLoginRepository doctorLoginRepository, AdminLoginRepository adminRepository) {
        this.patientLoginRepository = patientLoginRepository;
        this.doctorLoginRepository = doctorLoginRepository;
        this.adminRepository=adminRepository;
    }

    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authProvider=new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(this);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){

        return new BCryptPasswordEncoder();
    }

//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        PatientLogin patientLogin = patientLoginRepository.findByPtUsername(username)
//                .orElseThrow(() -> new UsernameNotFoundException("Patient not found with username: " + username));
//
//        Set<GrantedAuthority> authorities = new HashSet<>();
//        // Add the "ROLE_PATIENT" authority to the user
//        authorities.add(new SimpleGrantedAuthority("Patient"));
//
//        return new User(patientLogin.getUsername(), patientLogin.getPassword(), true, true, true, true, authorities);
//    }

    //For Both Doctor and Patient
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Load patient user
        Optional<PatientLogin> patientOptional = patientLoginRepository.findByPtUsername(username);
        if (patientOptional.isPresent()) {
            PatientLogin patientLogin = patientOptional.get();
            System.out.println("Patient:"+patientLogin.getPtUsername());
            Set<GrantedAuthority> authorities = new HashSet<>();
            authorities.add(new SimpleGrantedAuthority("Patient"));
            return new User(patientLogin.getPtUsername(), patientLogin.getPtPassword(), true, true, true, true, authorities);
        }

        // Load doctor user
        Optional<DoctorLogin> doctorOptional = doctorLoginRepository.findByDrUsername(username);
        if (doctorOptional.isPresent()) {
                //check isModerator, if it is true then assign Moderator role to it
            DoctorLogin doctorLogin = doctorOptional.get();
            System.out.println("Doctor:"+doctorLogin.getDrUsername());
            Set<GrantedAuthority> authorities = new HashSet<>();
            authorities.add(new SimpleGrantedAuthority("Doctor"));
            boolean isModerator=doctorLogin.getDrInfo().isDrIsModerator();
            if(isModerator){
                authorities.add(new SimpleGrantedAuthority("Moderator"));
            }
            // Assuming doctors have ROLE_DOCTOR
            return new User(doctorLogin.getDrUsername(), doctorLogin.getDrPassword(), true, true, true, true, authorities);
        }

        Optional<AdminLogin> adminLoginOptional= adminRepository.findByAdminUsername(username);
        if(adminLoginOptional.isPresent()){
            AdminLogin adminLogin=adminLoginOptional.get();
            Set<GrantedAuthority> authorities=new HashSet<>();
            authorities.add(new SimpleGrantedAuthority("Admin"));
            return new User(adminLogin.getAdminUsername(), adminLogin.getAdminPassword(), true, true, true, true, authorities);
        }
        throw new UsernameNotFoundException("User not found with username: " + username);
    }
}
