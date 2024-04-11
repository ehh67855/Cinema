package com.CSCI4050.jwt.backend.services;

import org.springframework.stereotype.Service;

import com.CSCI4050.jwt.backend.dtos.PromotionDto;
import com.CSCI4050.jwt.backend.entites.Promotion;
import com.CSCI4050.jwt.backend.repositories.PromotionRepository;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class PromotionService {
    
    private final PromotionRepository promotionRepository;

    public Iterable<Promotion> getAllPromotions() {
        return promotionRepository.findAll();
    }

    public Promotion addPromotion(@Valid PromotionDto promotion) {
        Promotion newPromotion = Promotion.builder()
        .discount(Long.valueOf(promotion.getPromotionDiscount()))
        .promoCode(Long.valueOf(promotion.getPromotionCode()))
        .build();
        return promotionRepository.save(newPromotion);
        
    }
}
