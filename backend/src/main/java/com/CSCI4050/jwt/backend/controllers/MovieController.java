package com.CSCI4050.jwt.backend.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.CSCI4050.jwt.backend.dtos.MovieDto;
import com.CSCI4050.jwt.backend.entites.Movie;
import com.CSCI4050.jwt.backend.services.MovieService;

@RestController
public class MovieController {

    @Autowired MovieService movieService;

    @GetMapping("/get-all-movies")
    public ResponseEntity<Iterable<Movie>> getAllMovies() {
        return new ResponseEntity<>(movieService.getAllMovies(), HttpStatus.OK);
    }

    @GetMapping("/get-movie/")
    public ResponseEntity<Movie> getMovie(@RequestParam Long id) {
        Optional<Movie> optionalMovie = movieService.getMovie(id);
        return optionalMovie 
            .map(movie -> ResponseEntity.ok(movie))
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/get-movie-time/{id}")
    public ResponseEntity<String> getMovieTime(@PathVariable("id") String id) {
        return ResponseEntity.ok("Not yet implimented");
    }

    @PostMapping("/add-movie")
    public ResponseEntity<Movie> addMovie(@RequestBody MovieDto movie) {
        return ResponseEntity.ok(movieService.addMovie(movie));
    }
}
