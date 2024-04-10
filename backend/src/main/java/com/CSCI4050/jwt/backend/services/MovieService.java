package com.CSCI4050.jwt.backend.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}