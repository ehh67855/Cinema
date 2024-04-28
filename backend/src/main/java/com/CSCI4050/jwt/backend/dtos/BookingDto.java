package com.CSCI4050.jwt.backend.dtos;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.CSCI4050.jwt.backend.entites.MovieTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookingDto {
    private Long numChildTickets;

    private Long numAdultTickets;

    private Long numSeniorTickets;

    private String movieTitle;

    private String creditCardId;

    private MovieTime movieTime;

    private String login;

    private List<String> seatSelection;
}
