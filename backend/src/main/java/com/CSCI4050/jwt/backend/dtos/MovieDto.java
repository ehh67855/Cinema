package com.CSCI4050.jwt.backend.dtos;

import java.time.LocalDate;
import java.time.LocalTime;

import com.CSCI4050.jwt.backend.entites.Theatre;
import com.CSCI4050.jwt.backend.enums.Rating;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MovieDto {
    private String title;

    private Boolean comingSoon;

    private Integer numStars;

    private String category;

    private String cast;

    private String director;

    private String producer;

    private String synopsis;

    private String description;

    private String trailerPictureURL;

    private String trailerVideoURL;

    private Rating rating;

    private LocalDate date;

    private LocalTime time;

    private Theatre theatre;
}
