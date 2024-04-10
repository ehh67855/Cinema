package com.CSCI4050.jwt.backend.entites;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Data
public class Adress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 100)
    @Column(nullable = true)
    private String street = "";
    
    @Size(max = 100)
    @Column(nullable = true)
    private String city = "";

    @Size(max = 100)
    @Column(nullable = true)
    private String state = "";

    @Size(max = 100)    
    @Column(nullable = true)
    private String zipcode = "";

    public Adress(String street,String city,String state,String zipcode) {
        this.state=state;
        this.street=street;
        this.city=city;
        this.zipcode=zipcode;
    }


}