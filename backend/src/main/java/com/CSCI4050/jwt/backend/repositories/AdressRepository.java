package com.CSCI4050.jwt.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.CSCI4050.jwt.backend.entites.Adress;

public interface AdressRepository extends JpaRepository<Adress,Long> {
    
}
