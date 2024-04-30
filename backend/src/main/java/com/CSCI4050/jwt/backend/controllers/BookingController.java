package com.CSCI4050.jwt.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.CSCI4050.jwt.backend.dtos.BookingDto;
import com.CSCI4050.jwt.backend.entites.Booking;
import com.CSCI4050.jwt.backend.services.BookingService;

@RestController
public class BookingController {
    @Autowired BookingService bookingService;

    @GetMapping("/get-all-bookings")
    public ResponseEntity<Iterable<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @PostMapping("/add-booking")
    public ResponseEntity<Booking> addBooking(@RequestBody BookingDto booking) {
        return ResponseEntity.ok(bookingService.addBooking(booking));
    }
}
