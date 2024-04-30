package com.CSCI4050.jwt.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.CSCI4050.jwt.backend.entites.ActivationToken;
import com.CSCI4050.jwt.backend.entites.User;

public interface ActivationTokenRepository extends JpaRepository<ActivationToken,Long> {
    ActivationToken findByToken(String token);
    ActivationToken findByUser(User user);
}
