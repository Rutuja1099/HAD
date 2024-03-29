package com.example.had_backend_jwt.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    public void sendSimpleMessage(String to, String Subject, String text)
    {
        SimpleMailMessage msg=new SimpleMailMessage();
        msg.setFrom("vikramvirwani2000@gmail.com");
        msg.setTo(to);
        msg.setSubject(Subject);
        msg.setText(text);
        mailSender.send(msg);
    }
}
