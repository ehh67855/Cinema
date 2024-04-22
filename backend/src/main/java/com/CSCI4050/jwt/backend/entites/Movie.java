package com.CSCI4050.jwt.backend.entites;

import java.util.ArrayList;
import java.util.List;

import com.CSCI4050.jwt.backend.enums.Rating;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Data
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;

    private String description;

    private String director;

    private String producer;

    private String synopsis;

    private String trailerPictureURL;

    private String trailerVideoURL;

    private Boolean comingSoon;

    private Integer numStars;

    private String category;

    private String cast;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "movie_id")
    private List<Review> reviews = new ArrayList<Review>();

    //specify how the rating field should be persisted in the database
    @Enumerated(EnumType.STRING)
    private Rating rating;

    //movie_id is the name of the foreign key column in the MovieTime table that references the Movie table.
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    @JoinColumn(name = "movie_id")
    private List<MovieTime> showings = new ArrayList<MovieTime>();

}
