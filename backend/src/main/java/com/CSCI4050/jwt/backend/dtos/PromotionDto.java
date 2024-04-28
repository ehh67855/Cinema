package com.CSCI4050.jwt.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PromotionDto {
    String id;
    String promotionCode;
    String promotionDiscount;
}
