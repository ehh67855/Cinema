package com.CSCI4050.jwt.backend.services;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.CSCI4050.jwt.backend.dtos.PromotionDto;
import com.CSCI4050.jwt.backend.entites.Promotion;
import com.CSCI4050.jwt.backend.exceptions.AppException;
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
        if (promotionRepository.existsByPromoCode(Integer.valueOf(promotion.getPromotionCode()))) {
            throw new AppException("Promo code is in use already", HttpStatus.CONFLICT);
        }
        Promotion newPromotion = Promotion.builder()
        .discount(Long.valueOf(promotion.getPromotionDiscount()))
        .promoCode(Long.valueOf(promotion.getPromotionCode()))
        .build();
        return promotionRepository.save(newPromotion);
        
    }

    public Promotion updatePromotion(@Valid PromotionDto promotion) {
        if (promotionRepository.existsByPromoCode(Integer.valueOf(promotion.getPromotionCode()))) {
            throw new AppException("Promo code is in use already", HttpStatus.CONFLICT);
        }
        Promotion storedPromotion = promotionRepository.findById(Long.valueOf(promotion.getId()))
            .orElseThrow( () -> new AppException("Promo not found", HttpStatus.BAD_REQUEST));
        storedPromotion.setDiscount(Long.valueOf(promotion.getPromotionDiscount()));
        storedPromotion.setPromoCode(Long.valueOf(promotion.getPromotionCode()));
        return promotionRepository.save(storedPromotion);
    }

    public Promotion getPromotion(String promoCode) {
        Promotion promotion = promotionRepository.findByPromoCode(Integer.valueOf(promoCode))
        .orElseThrow(()->new AppException("Could not find promotion", HttpStatus.BAD_REQUEST));
        return promotion;
    }   
}
