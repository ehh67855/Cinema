package com.CSCI4050.jwt.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.CSCI4050.jwt.backend.entites.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking,Long> {
    List<Booking> findByLogin(String login);
    
}
