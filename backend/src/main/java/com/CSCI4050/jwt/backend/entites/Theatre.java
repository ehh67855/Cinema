package com.CSCI4050.jwt.backend.entites;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Data
public class Theatre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;
        
    private Double adultTicketPrice;
        
    private Double seniorTicketPrice;
        
    private Double childTicketPrice;

    @Builder.Default
    private Boolean[][] seats = {{true,true,false,false},
                                {false,false,false,false},
                                {false,false,false,false},
                                {false,false,false,false}};
}
