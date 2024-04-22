package com.CSCI4050.jwt.backend.dtos;

import com.CSCI4050.jwt.backend.enums.TicketType;
import com.CSCI4050.jwt.backend.entites.User;
import com.CSCI4050.jwt.backend.entites.Booking;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TicketDto {
    private TicketType ticketType;

    private Double price;

    private User userAccount;

    private String seat;

    private Booking booking;
}
