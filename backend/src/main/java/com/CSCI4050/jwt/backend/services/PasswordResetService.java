package com.CSCI4050.jwt.backend.services;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.CSCI4050.jwt.backend.dtos.SignUpDto;
import com.CSCI4050.jwt.backend.dtos.UserDto;
import com.CSCI4050.jwt.backend.entites.PasswordResetToken;
import com.CSCI4050.jwt.backend.entites.User;
import com.CSCI4050.jwt.backend.exceptions.AppException;
import com.CSCI4050.jwt.backend.mappers.UserMapper;
import com.CSCI4050.jwt.backend.repositories.AdressRepository;
import com.CSCI4050.jwt.backend.repositories.CreditCardRepository;
import com.CSCI4050.jwt.backend.repositories.PasswordResetTokenRepository;
import com.CSCI4050.jwt.backend.repositories.UserRepository;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

import java.nio.CharBuffer;


@RequiredArgsConstructor
@Service
public class PasswordResetService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final PasswordResetTokenRepository passwordResetTokenRepository;

    private final UserService userService;

    private final UserMapper userMapper;

    private final EmailService emailService;

    
    public UserDto forgotPassword(@Valid SignUpDto user) {
        User forgotUser = userService.getUser(user.getLogin());
        String token = emailService.generateToken();
        createPasswordResetToken(forgotUser, token);
        emailService.sendPasswordResetEmail(forgotUser.getLogin(), token);
        return userMapper.toUserDto(forgotUser);
    }

    public void createPasswordResetToken(User user, String token) {
        // Check if a token already exists for the user
        PasswordResetToken existingToken = passwordResetTokenRepository.findByUser(user);
        if (existingToken != null) {
            // If a token already exists, update it with the new token and expiry date
            existingToken.setToken(token);
            existingToken.setExpiryDate(LocalDateTime.now().plusHours(1));
            passwordResetTokenRepository.save(existingToken);
        } else {
            // If no token exists, create a new one and save it
            PasswordResetToken newToken = new PasswordResetToken();
            newToken.setUser(user);
            newToken.setToken(token);
            newToken.setExpiryDate(LocalDateTime.now().plusHours(1));
            passwordResetTokenRepository.save(newToken);
        }
    }

    public UserDto resetPassword(SignUpDto userDto, String token) {
    PasswordResetToken resetToken = getPasswordResetToken(token);
        if (resetToken == null || resetToken.isExpired()) {
            throw new AppException("Invalid or expired token", HttpStatus.FORBIDDEN);
        }

        User user = resetToken.getUser();
        if (!user.getLogin().equals(userDto.getLogin())) {
            throw new AppException("Invalid token for user email", HttpStatus.FORBIDDEN);
        }

        // Assuming you have a method to properly hash the password
        String hashedPassword = passwordEncoder.encode(CharBuffer.wrap(userDto.getPassword()));

        // Set the new password for the user
        user.setPassword(hashedPassword);

        // Save the updated user to the database
        userRepository.save(user);

        // Delete the password reset token
        deletePasswordResetToken(resetToken);

        return userMapper.toUserDto(user);
    }


    public PasswordResetToken getPasswordResetToken(String token) {
        return passwordResetTokenRepository.findByToken(token);
    }

    public void deletePasswordResetToken(PasswordResetToken token) {
        passwordResetTokenRepository.delete(token);
    }

    public void resetPassword(User user, String newPassword) {
        user.setPassword(passwordEncoder.encode(newPassword)); 
        userRepository.save(user);
    }
}
