package com.CSCI4050.jwt.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.CSCI4050.jwt.backend.entites.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review,Long> {
    
}
