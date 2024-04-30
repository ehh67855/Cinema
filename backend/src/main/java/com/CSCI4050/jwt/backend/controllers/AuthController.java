package com.CSCI4050.jwt.backend.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.eclipse.angus.mail.smtp.SMTPAddressFailedException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.CSCI4050.jwt.backend.config.UserAuthenticationProvider;
import com.CSCI4050.jwt.backend.dtos.CredentialsDto;
import com.CSCI4050.jwt.backend.dtos.SignUpDto;
import com.CSCI4050.jwt.backend.dtos.UpdatePasswordDto;
import com.CSCI4050.jwt.backend.dtos.UserDto;
import com.CSCI4050.jwt.backend.entites.User;
import com.CSCI4050.jwt.backend.exceptions.AppException;
import com.CSCI4050.jwt.backend.services.EmailService;
import com.CSCI4050.jwt.backend.services.PasswordResetService;
import com.CSCI4050.jwt.backend.services.UserService;

import java.net.URI;
import java.util.Map;

@RequiredArgsConstructor
@RestController
public class AuthController {

    private final UserService userService;
    private final EmailService emailService;
    private final UserAuthenticationProvider userAuthenticationProvider;
    private final PasswordResetService passwordResetService;

    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody @Valid CredentialsDto credentialsDto) {
        UserDto userDto = userService.login(credentialsDto);
        userDto.setToken(userAuthenticationProvider.createToken(userDto));
        return ResponseEntity.ok(userDto);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody @Valid SignUpDto userDto) {
        UserDto createdUser = userService.register(userDto);
        String token = emailService.generateToken(); // Reuse your token generation logic
        userService.createActivationToken(userService.getUser(userDto.getLogin()), token);
        userService.sendActivationEmail(userDto.getLogin(), token);
        return ResponseEntity.created(URI.create("/users/" + createdUser.getId())).body(createdUser);
    }

    @GetMapping("/get-user/{login}")
    public ResponseEntity<User> getUser(@PathVariable String login) {
        System.out.println("hello");
        return ResponseEntity.ok(userService.getUser(login));
    }

    
    @PostMapping("/update-personal-info")
    public ResponseEntity<UserDto> updatePersonalInfo(@RequestBody @Valid SignUpDto user) {
        return ResponseEntity.ok(userService.updatePersonalInfo(user));
    }

    @PostMapping("/update-home-adress")
    public ResponseEntity<UserDto> updateHomeAdress(@RequestBody @Valid SignUpDto user) {
        return ResponseEntity.ok(userService.updateHomeAdress(user));
    }

    @PostMapping("/update-password")
    public ResponseEntity<UserDto> updatePassword(@RequestBody @Valid UpdatePasswordDto passwordDto) {
        return ResponseEntity.ok(userService.updatePassword(passwordDto));
    }

    @PostMapping("/add-card")
    public ResponseEntity<UserDto> addCard(@RequestBody @Valid SignUpDto user) {
        return ResponseEntity.ok(userService.addCard(user));
    }

    @PostMapping("/delete-card/{id}")
    public ResponseEntity<UserDto> deleteCard(@PathVariable("id") String cardId, @RequestBody SignUpDto user) {
        return ResponseEntity.ok(userService.deleteCard(user, Long.valueOf(cardId)));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<UserDto> forgotPassword(@RequestBody @Valid SignUpDto user) {
        return ResponseEntity.ok(passwordResetService.forgotPassword(user));
    }

    @PostMapping("/reset-password/{token}")
    public ResponseEntity<UserDto> resetPassword(
        @PathVariable("token") String token,
        @RequestBody @Valid SignUpDto user) {
        return ResponseEntity.ok(passwordResetService.resetPassword(user,token));
    }
    
    @PostMapping("/activate-account")
    public ResponseEntity<String> activateAccount(@RequestBody Map<String, String> body) {
        String token = body.get("token");
        boolean activated = userService.activateAccount(token);
        if (activated) {
            return ResponseEntity.ok("Account activated successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Activation failed.");
        }
    }
    

    

}
