package com.CSCI4050.jwt.backend.services;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.info.ProjectInfoProperties.Build;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.CSCI4050.jwt.backend.dtos.CredentialsDto;
import com.CSCI4050.jwt.backend.dtos.SignUpDto;
import com.CSCI4050.jwt.backend.dtos.UserDto;
import com.CSCI4050.jwt.backend.entites.Adress;
// import com.CSCI4050.jwt.backend.entites.Adress;
import com.CSCI4050.jwt.backend.entites.CreditCard;
import com.CSCI4050.jwt.backend.entites.User;
import com.CSCI4050.jwt.backend.enums.Role;
import com.CSCI4050.jwt.backend.exceptions.AppException;
import com.CSCI4050.jwt.backend.mappers.UserMapper;
import com.CSCI4050.jwt.backend.repositories.AdressRepository;
import com.CSCI4050.jwt.backend.repositories.CreditCardRepository;
import com.CSCI4050.jwt.backend.repositories.UserRepository;

import java.nio.CharBuffer;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final CreditCardRepository creditCardRepository;

    private final AdressRepository adressRepository;

    private final UserMapper userMapper;

    public User createUser(String firstName, String lastName, String login, String password, Role role) {
        User newUser = User.builder()
                .firstName(firstName)
                .lastName(lastName)
                .login(login)
                .password(passwordEncoder.encode(password))
                .role(role)
                .build();
        return userRepository.save(newUser);
    }

    public UserDto login(CredentialsDto credentialsDto) {
        User user = userRepository.findByLogin(credentialsDto.getLogin())
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
                        
        if (passwordEncoder.matches(CharBuffer.wrap(credentialsDto.getPassword()), user.getPassword())) {
            return userMapper.toUserDto(user);
        }
        throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
    }

    public UserDto register(SignUpDto userDto) {
        Optional<User> optionalUser = userRepository.findByLogin(userDto.getLogin());

        if (optionalUser.isPresent()) {
            throw new AppException("Login already exists", HttpStatus.BAD_REQUEST);
        }

        User user = userMapper.signUpToUser(userDto);
        user.setRole(Role.USER);
        user.setPassword(passwordEncoder.encode(CharBuffer.wrap(userDto.getPassword())));
        user.setActive(true);
        user.setPhoneNumber(userDto.getPhoneNumber());

        User savedUser = userRepository.save(user);

        //Optionally set credit card
        if (userDto.isCardFieldsFilled()) {
            List<CreditCard> creditCards = new ArrayList<>(3);
            CreditCard creditCard = CreditCard.builder()
                .cardType(userDto.getCardType())
                .expirationDate(userDto.getCardExpiry())
                .billingAdress(userDto.getBillingAddr())
                .build();
            CreditCard savedCreditCard = creditCardRepository.save(creditCard);
            creditCards.add(savedCreditCard);
            savedUser.getCreditCards().add(savedCreditCard);
            userRepository.save(savedUser);
        }

        //Optionally set home adress card
        //Helper   : Field 'adress' doesn't have a default value
        // could not execute statement [Field 'adress' doesn't have a default value] [insert into adress (city,state,street,zipcode) values (?,?,?,?)]
        try {
            if (userDto.isAddressFieldsFilled()) {
                Adress adress = Adress.builder()
                    .street(userDto.getStreet())
                    .city(userDto.getCity())
                    .state(userDto.getState())
                    .zipcode(userDto.getZipCode())
                .build();
                System.out.println(adress);
                Adress savedAdress = adressRepository.save(adress);
                savedUser.setHomeAddress(savedAdress);
                userRepository.save(savedUser);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        return userMapper.toUserDto(savedUser);
    }

    public UserDto findByLogin(String login) {
        User user = userRepository.findByLogin(login)
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
        return userMapper.toUserDto(user);
    }

    public User getUser(String login) {
        return userRepository.findByLogin(login)
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
    }

}
