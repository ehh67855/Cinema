package com.CSCI4050.jwt.backend.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.CSCI4050.jwt.backend.dtos.MovieDto;
import com.CSCI4050.jwt.backend.entites.Movie;
import com.CSCI4050.jwt.backend.repositories.MovieRepository;

@Service
public class MovieService {

    @Autowired MovieRepository movieRepository;

    public Iterable<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    public Optional<Movie> getMovie(Long id) {
        return movieRepository.findById(id);
    }

    public Movie addMovie(MovieDto movie) {
        Movie newMovie = Movie.builder()
        .cast(movie.getCast())
        .category(movie.getCategory())
        .comingSoon(true)
        .description(movie.getDescription())
        .director(movie.getDirector())
        .numStars(movie.getNumStars())
        .producer(movie.getProducer())
        .rating(movie.getRating())
        .synopsis(movie.getSynopsis())
        .title(movie.getTitle())
        .trailerPictureURL(movie.getTrailerPictureURL())
        .trailerVideoURL(movie.getTrailerVideoURL())
        .build();
        return movieRepository.save(newMovie);
    }
}