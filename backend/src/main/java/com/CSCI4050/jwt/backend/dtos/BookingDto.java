package com.CSCI4050.jwt.backend.dtos;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookingDto {
    private int numOfTickets;

    private String movieTitle;

    private Long creditCardId;

    private String creditCardNum;

    private LocalDate bookingDate;

    private LocalTime bookingTime;
}
