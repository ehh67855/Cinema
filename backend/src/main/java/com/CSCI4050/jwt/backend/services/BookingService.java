package com.CSCI4050.jwt.backend.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.CSCI4050.jwt.backend.dtos.BookingDto;
import com.CSCI4050.jwt.backend.entites.Booking;
import com.CSCI4050.jwt.backend.entites.CreditCard;
import com.CSCI4050.jwt.backend.entites.Ticket;
import com.CSCI4050.jwt.backend.enums.TicketType;
import com.CSCI4050.jwt.backend.exceptions.AppException;
import com.CSCI4050.jwt.backend.repositories.BookingRepository;
import com.CSCI4050.jwt.backend.repositories.CreditCardRepository;

import jakarta.validation.Valid;

@Service
public class BookingService {
    @Autowired BookingRepository bookingRepository;
    @Autowired CreditCardRepository creditCardRepository;
    @Autowired UserService userService;
    @Autowired EmailService emailService;

    public Optional<Booking> getBooking(Long id) {
        return bookingRepository.findById(id);
    }

    public Booking addBooking(@Valid BookingDto booking) {
        System.out.println(booking);
        Booking newBooking = new Booking();
        
        List<Ticket> tickets = new ArrayList<>();
        for (int i = 0 ; i < Long.valueOf(booking.getNumChildTickets());i++) {
            Ticket ticket = Ticket.builder()
            .ticketType(TicketType.CHILD)
            .price(booking.getMovieTime().getTheatre().getChildTicketPrice())
            .movieTime(booking.getMovieTime())
            .build();
            tickets.add(ticket);
        }

        for (int i = 0 ; i < Long.valueOf(booking.getNumAdultTickets());i++) {
            Ticket ticket = Ticket.builder()
            .ticketType(TicketType.ADULT)
            .price(booking.getMovieTime().getTheatre().getAdultTicketPrice())
            .movieTime(booking.getMovieTime())
            .build();
            tickets.add(ticket);
        }

        for (int i = 0 ; i < Long.valueOf(booking.getNumSeniorTickets());i++) {
            Ticket ticket = Ticket.builder()
            .ticketType(TicketType.SENIOR)
            .price(booking.getMovieTime().getTheatre().getSeniorTicketPrice())
            .movieTime(booking.getMovieTime())
            .build();
            tickets.add(ticket);
        }

        CreditCard creditCard = creditCardRepository.findById(Long.valueOf(booking.getCreditCardId()))
        .orElseThrow(()->new AppException("Could not find credit Card", HttpStatus.BAD_REQUEST));

        newBooking.setCreditCard(creditCard);
        newBooking.setTickets(tickets);
        emailService.sendSimpleMessage(booking.getLogin(), "Successful booking", "You booking has been successfully saved. Enjoy your movie.");
        return bookingRepository.save(newBooking);

    }

}
