package com.CSCI4050.jwt.backend.entites;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


import com.CSCI4050.jwt.backend.enums.TicketType;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Data
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; 

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TicketType ticketType; // ADULT, CHILD, SENIOR

    @Column(nullable = false)
    private Double price;

    @ManyToOne
    @JoinColumn(name = "movie_time_id")
    private MovieTime movieTime;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User userAccount;

    @ManyToOne
    @JoinColumn(name = "booking_id")
    private Booking booking; 
}