package com.CSCI4050.jwt.backend.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.CSCI4050.jwt.backend.dtos.TheatreDto;
import com.CSCI4050.jwt.backend.entites.Theatre;
import com.CSCI4050.jwt.backend.repositories.TheatreRepository;

@Service
public class TheatreService {
    @Autowired TheatreRepository theatreRepository;

    public Optional<Theatre> getTheatre(Long id) {
        return theatreRepository.findById(id);
    };

    public Theatre editTheatre(Long id, TheatreDto theatre) {
        Theatre currentTheatre = theatreRepository.findById(id).get();

        currentTheatre.setSeats(theatre.getSeats());

        return theatreRepository.save(currentTheatre);
    };
}
