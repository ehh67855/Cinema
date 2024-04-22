package com.CSCI4050.jwt.backend.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.CSCI4050.jwt.backend.dtos.TicketDto;
import com.CSCI4050.jwt.backend.entites.Ticket;
import com.CSCI4050.jwt.backend.services.TicketService;

@RestController
public class TicketController {
    @Autowired TicketService ticketService;

    @GetMapping("/get-ticket/{id}")
    public ResponseEntity<Optional<Ticket>> getTicket(@PathVariable("id") String id) {
        return ResponseEntity.ok(ticketService.getTicket(Long.valueOf(id)));
    }

    @PostMapping("/add-ticket")
    public ResponseEntity<Ticket> addTicket(@RequestBody TicketDto ticket) {
        return ResponseEntity.ok(ticketService.addTicket(ticket));
    }
}
