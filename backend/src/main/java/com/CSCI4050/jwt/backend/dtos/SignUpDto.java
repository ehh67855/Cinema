package com.CSCI4050.jwt.backend.dtos;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SignUpDto {

    private boolean cardFieldsFilled;

    private boolean addressFieldsFilled;

    private String login;

    private String phoneNumber;

    private String firstName;

    private String lastName;

    private char[] password;

    private Boolean isSubscribed;

    private String cardNumber;
    
    private String cardType;
    
    private String cardExpiry;
    
    private String billingAddr;
    
    private String street;
    
    private String city;
    
    private String state;
    
    private String zipCode;

    private String role;

    private String isActive;

}
