package com.CSCI4050.jwt.backend.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.CSCI4050.jwt.backend.dtos.BookingDto;
import com.CSCI4050.jwt.backend.entites.Booking;
import com.CSCI4050.jwt.backend.repositories.BookingRepository;

@Service
public class BookingService {
    @Autowired BookingRepository bookingRepository;

    public Optional<Booking> getBooking(Long id) {
        return bookingRepository.findById(id);
    }

    public Booking addBooking(BookingDto booking) {
        Booking newBooking = Booking.builder()
        .numOfTickets(booking.getNumOfTickets())
        .movieTitle(booking.getMovieTitle())
        .creditCardNum(booking.getCreditCardNum())
        .bookingDate(booking.getBookingDate())
        .bookingTime(booking.getBookingTime())
        .build();
        return bookingRepository.save(newBooking);
    }
}
