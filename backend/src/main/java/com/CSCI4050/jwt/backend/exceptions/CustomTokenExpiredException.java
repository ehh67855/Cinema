package com.CSCI4050.jwt.backend.exceptions;

public class CustomTokenExpiredException extends RuntimeException {

    public CustomTokenExpiredException(String message) {
        super(message);
    }
}
