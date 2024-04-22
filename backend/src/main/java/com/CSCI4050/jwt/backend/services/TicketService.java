package com.CSCI4050.jwt.backend.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.CSCI4050.jwt.backend.dtos.TicketDto;
import com.CSCI4050.jwt.backend.entites.Ticket;
import com.CSCI4050.jwt.backend.repositories.TicketRepository;

@Service
public class TicketService {
    @Autowired TicketRepository ticketRepository;

    public Optional<Ticket> getTicket(Long id) {
        return ticketRepository.findById(id);
    }

    public Ticket addTicket(TicketDto ticket) {
        Ticket newTicket = Ticket.builder()
        .ticketType(ticket.getTicketType())
        .price(ticket.getPrice())
        .userAccount(ticket.getUserAccount())
        .seat(ticket.getSeat())
        .booking(ticket.getBooking())
        .build();
        return ticketRepository.save(newTicket);
    }
}
