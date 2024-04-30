package com.CSCI4050.jwt.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.CSCI4050.jwt.backend.entites.User;
import com.CSCI4050.jwt.backend.repositories.UserRepository;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.Iterator;
import java.util.List;



@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired UserRepository userRepository;


    private static final SecureRandom secureRandom = new SecureRandom();

    public void sendSimpleMessage(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage(); 
        message.setFrom("cinemaapplication9@gmail.com");
        message.setTo(to); 
        message.setSubject(subject); 
        message.setText(text);
        mailSender.send(message);
    }

    public void sendPasswordResetEmail(String to, String token) {
        String subject = "Password Reset Request";
        String text = "To reset your password, use the link below:\n\n"
                      + "http://localhost:4200/reset-password?token=" + token;

        sendSimpleMessage(to, subject, text);
    }

    public String generateToken() {
        byte[] randomBytes = new byte[32];
        secureRandom.nextBytes(randomBytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes);
    }

    public void sendMessageToAllUsers(String subject, String text) {
        List<User> users = userRepository.findByPromotionsEnabledTrue();
        for(User user : users) {
            sendSimpleMessage(user.getLogin(), subject, text);
        }
    }
}
