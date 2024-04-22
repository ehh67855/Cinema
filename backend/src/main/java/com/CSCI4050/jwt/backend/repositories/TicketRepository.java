package com.CSCI4050.jwt.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.CSCI4050.jwt.backend.entites.Ticket;

@Repository
public interface TicketRepository extends JpaRepository<Ticket,Long> {
    
}
