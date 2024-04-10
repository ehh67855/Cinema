package com.CSCI4050.jwt.backend.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.CSCI4050.jwt.backend.config.UserAuthenticationProvider;
import com.CSCI4050.jwt.backend.dtos.CredentialsDto;
import com.CSCI4050.jwt.backend.dtos.SignUpDto;
import com.CSCI4050.jwt.backend.dtos.UserDto;
import com.CSCI4050.jwt.backend.entites.User;
import com.CSCI4050.jwt.backend.services.UserService;

import java.net.URI;

@RequiredArgsConstructor
@RestController
public class AuthController {

    private final UserService userService;
    private final UserAuthenticationProvider userAuthenticationProvider;

    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody @Valid CredentialsDto credentialsDto) {
        UserDto userDto = userService.login(credentialsDto);
        userDto.setToken(userAuthenticationProvider.createToken(userDto));
        return ResponseEntity.ok(userDto);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody @Valid SignUpDto user) {
        System.out.println(user);
        UserDto createdUser = userService.register(user);
        createdUser.setToken(userAuthenticationProvider.createToken(createdUser));
        return ResponseEntity.created(URI.create("/users/" + createdUser.getId())).body(createdUser);
    }

    @GetMapping("/get-user/{login}")
    public ResponseEntity<User> getUser(@PathVariable String login) {
        return ResponseEntity.ok(userService.getUser(login));
    }
}
