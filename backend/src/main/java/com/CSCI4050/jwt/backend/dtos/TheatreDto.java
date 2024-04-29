package com.CSCI4050.jwt.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TheatreDto {
    private double seniorTicketPrice;
    private double adultTicketPrice;
    private double childTicketPrice;
    private Boolean[][] seats;
}
