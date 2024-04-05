package com.example.had_backend_jwt.Repositories;

import com.example.had_backend_jwt.Entities.Appointments;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository extends JpaRepository<Appointments,Integer> {
}
