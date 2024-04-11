package com.CSCI4050.jwt.backend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.CSCI4050.jwt.backend.dtos.PromotionDto;
import com.CSCI4050.jwt.backend.entites.Promotion;
import com.CSCI4050.jwt.backend.services.PromotionService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class PromotionController {

    private final PromotionService promotionService;

    @PostMapping("/add-promotion")
    public ResponseEntity<Promotion> addPromotion(@RequestBody @Valid PromotionDto promotion) {
        return ResponseEntity.ok(promotionService.addPromotion(promotion));
    }

    @GetMapping("/get-all-promotions")
    public ResponseEntity<Iterable<Promotion>> getAllPromotions() {
        return ResponseEntity.ok(promotionService.getAllPromotions());
    }
    
}
