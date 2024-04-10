package com.CSCI4050.jwt.backend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.CSCI4050.jwt.backend.dtos.MessageDto;

@RestController
public class MessagesController {

    @GetMapping("/messages")
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    public ResponseEntity<MessageDto> message() {
        return ResponseEntity.ok(new MessageDto("user's message"));
    }
    
    @GetMapping("/protected/messages")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<MessageDto> protectedMessage() {
        return ResponseEntity.ok(new MessageDto("protected user's message"));
    }
}
