package com.CSCI4050.jwt.backend.controllers;

// import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.CSCI4050.jwt.backend.dtos.TheatreDto;
import com.CSCI4050.jwt.backend.entites.Theatre;
import com.CSCI4050.jwt.backend.services.TheatreService;

@RestController
public class TheatreController {
    @Autowired TheatreService theatreService;

    // @GetMapping("/get-theatre/{id}")
    // public ResponseEntity<Optional<Theatre>> getTheatre(@PathVariable("id") String id) {
    //     return ResponseEntity.ok(theatreService.getTheatre(Long.valueOf(id)));
    // }

    @PutMapping("/edit-theatre/{id}")
    public ResponseEntity<Theatre> editTheatre(@PathVariable("id") String id, @RequestBody TheatreDto theatre) {
        return ResponseEntity.ok(theatreService.editTheatre(Long.valueOf(id), theatre));
    }
}
