package com.CSCI4050.jwt.backend.services;

import java.util.Optional;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.CSCI4050.jwt.backend.dtos.MovieDto;
import com.CSCI4050.jwt.backend.entites.Movie;
import com.CSCI4050.jwt.backend.entites.MovieTime;
import com.CSCI4050.jwt.backend.repositories.MovieRepository;
import com.CSCI4050.jwt.backend.repositories.MovieTimeRepository;

@Service
public class MovieService {

    @Autowired MovieRepository movieRepository;
    @Autowired MovieTimeRepository movieTimeRepository;

    public Iterable<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    public Optional<Movie> getMovie(Long id) {
        return movieRepository.findById(id);
    }

    public Optional<MovieTime> getMovieTime(Long id) {
        return movieTimeRepository.findById(id);
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

        List<MovieTime> showings = new ArrayList<>();
        MovieTime newMovieTime = MovieTime.builder()
        .date(movie.getDate())
        .time(movie.getTime())
        .theatre(movie.getTheatre())
        .build();
        MovieTime savedMovieTime = movieTimeRepository.save(newMovieTime);
        showings.add(savedMovieTime);
        newMovie.getShowings().add(savedMovieTime);

        return movieRepository.save(newMovie);
    }
}