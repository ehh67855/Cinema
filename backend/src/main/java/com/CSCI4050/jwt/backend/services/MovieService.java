package com.CSCI4050.jwt.backend.services;

import java.util.Optional;
import java.util.ArrayList;
import java.util.List;
import java.time.LocalDate;
import java.time.LocalTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.CSCI4050.jwt.backend.dtos.MovieDto;
import com.CSCI4050.jwt.backend.entites.Movie;
import com.CSCI4050.jwt.backend.entites.MovieTime;
import com.CSCI4050.jwt.backend.repositories.MovieRepository;
import com.CSCI4050.jwt.backend.repositories.MovieTimeRepository;
import com.CSCI4050.jwt.backend.repositories.TheatreRepository;

@Service
public class MovieService {

    @Autowired MovieRepository movieRepository;
    @Autowired MovieTimeRepository movieTimeRepository;
    @Autowired TheatreRepository theatreRepository;

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
        .comingSoon(movie.getComingSoon())
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
        .date(LocalDate.parse(movie.getDate()))
        .time(LocalTime.parse(movie.getTime()))
        .theatre(theatreRepository.findById(Long.valueOf(movie.getNumTheatre().toString())).get())
        .build();
        MovieTime savedMovieTime = movieTimeRepository.save(newMovieTime);
        showings.add(savedMovieTime);
        newMovie.getShowings().add(savedMovieTime);

        return movieRepository.save(newMovie);
    }

    public Movie editMovie(Long id, MovieDto movie) {
        Movie currentMovie = movieRepository.findById(id).get();
        currentMovie.setCast(movie.getCast());
        currentMovie.setCategory(movie.getCategory());
        currentMovie.setComingSoon(movie.getComingSoon());
        currentMovie.setDescription(movie.getDescription());
        currentMovie.setDirector(movie.getDirector());
        currentMovie.setNumStars(movie.getNumStars());
        currentMovie.setProducer(movie.getProducer());
        currentMovie.setRating(movie.getRating());
        currentMovie.setSynopsis(movie.getSynopsis());
        currentMovie.setTitle(movie.getTitle());
        currentMovie.setTrailerPictureURL(movie.getTrailerPictureURL());
        currentMovie.setTrailerVideoURL(movie.getTrailerVideoURL());
        return movieRepository.save(currentMovie);
    }

    public MovieTime addMovieTime(Long id, MovieDto movie) {
        MovieTime newMovieTime = MovieTime.builder()
        .date(LocalDate.parse(movie.getDate()))
        .time(LocalTime.parse(movie.getTime()))
        .theatre(theatreRepository.findById(Long.valueOf(movie.getNumTheatre().toString())).get())
        .build();

        Movie currentMovie = movieRepository.findById(id).get();
        List<MovieTime> showings = currentMovie.getShowings();
        MovieTime savedMovieTime = movieTimeRepository.save(newMovieTime);
        showings.add(savedMovieTime);
        currentMovie.setShowings(showings);
        movieRepository.save(currentMovie);

        return savedMovieTime;
    }

    public void deleteMovie(Long id) {
        movieRepository.deleteById(id);
    }
}