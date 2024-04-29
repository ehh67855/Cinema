package com.CSCI4050.jwt.backend.dtos;

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

    private String date;

    private String time;

    private Integer numTheatre;

    private String review;
}
