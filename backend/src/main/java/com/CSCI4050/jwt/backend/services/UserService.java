package com.CSCI4050.jwt.backend.services;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.info.ProjectInfoProperties.Build;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.CSCI4050.jwt.backend.dtos.CredentialsDto;
import com.CSCI4050.jwt.backend.dtos.SignUpDto;
import com.CSCI4050.jwt.backend.dtos.UpdatePasswordDto;
import com.CSCI4050.jwt.backend.dtos.UserDto;
import com.CSCI4050.jwt.backend.entites.ActivationToken;
import com.CSCI4050.jwt.backend.entites.Adress;
// import com.CSCI4050.jwt.backend.entites.Adress;
import com.CSCI4050.jwt.backend.entites.CreditCard;
import com.CSCI4050.jwt.backend.entites.PasswordResetToken;
import com.CSCI4050.jwt.backend.entites.User;
import com.CSCI4050.jwt.backend.enums.Role;
import com.CSCI4050.jwt.backend.enums.TicketType;
import com.CSCI4050.jwt.backend.exceptions.AppException;
import com.CSCI4050.jwt.backend.mappers.UserMapper;
import com.CSCI4050.jwt.backend.repositories.ActivationTokenRepository;
import com.CSCI4050.jwt.backend.repositories.AdressRepository;
import com.CSCI4050.jwt.backend.repositories.CreditCardRepository;
import com.CSCI4050.jwt.backend.repositories.PasswordResetTokenRepository;
import com.CSCI4050.jwt.backend.repositories.UserRepository;

import jakarta.validation.Valid;

import java.nio.CharBuffer;
import java.time.LocalDateTime;
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

    private final EmailService emailService;

    private final ActivationTokenRepository activationTokenRepository;

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
                        
        if (!user.isActive()) {
            throw new AppException("User account has been suspended",HttpStatus.FORBIDDEN);
        }
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
        user.setActive(false);
        user.setPhoneNumber(userDto.getPhoneNumber());

        User savedUser = userRepository.save(user);

        //Optionally set credit card
        if (userDto.isCardFieldsFilled()) {
            List<CreditCard> creditCards = new ArrayList<>(3);
            CreditCard creditCard = CreditCard.builder()
                .cardType(userDto.getCardType())
                .expirationDate(userDto.getCardExpiry())
                .billingAdress(userDto.getBillingAddr())
                .cardNumber(userDto.getCardNumber())
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

    public UserDto updatePersonalInfo(@Valid SignUpDto user) {
        User updatedUser = getUser(user.getLogin());
        updatedUser.setFirstName(user.getFirstName());
        updatedUser.setLastName(user.getLastName());
        updatedUser.setPhoneNumber(user.getPhoneNumber());
        updatedUser.setPromotionsEnabled(user.getIsSubscribed());
        if(user.getIsActive()!= null)
            updatedUser.setActive(user.getIsActive().equals("true"));
        if(user.getRole()!=null)
            updatedUser.setRole(user.getRole().equals("ADMIN") ? Role.ADMIN : Role.USER);
        emailService.sendSimpleMessage(
            user.getLogin(),
            "Profile Updated",
            "Hello " + user.getFirstName() + ", \n Your profile has been successfully updated."
        );

        return userMapper.toUserDto(userRepository.save(updatedUser));
    }

    public UserDto updateHomeAdress(@Valid SignUpDto user) {
        User updatedUser = getUser(user.getLogin());
        
        boolean adressIsPresent = adressRepository.findById(updatedUser.getHomeAddress().getId()).isPresent();
        if (adressIsPresent) {
            Adress updatedHomeAdress = adressRepository.findById(updatedUser.getHomeAddress().getId()).get();
            updatedHomeAdress.setCity(user.getCity());
            updatedHomeAdress.setZipcode(user.getZipCode());
            updatedHomeAdress.setState(user.getState());
            updatedHomeAdress.setStreet(user.getStreet());
            adressRepository.save(updatedHomeAdress);
            updatedUser.setHomeAddress(updatedHomeAdress);
        } else {
            Adress updatedHomeAdress = Adress.builder()
                .street(user.getStreet())
                .city(user.getCity())
                .state(user.getState())
                .zipcode(user.getZipCode())
                .build();
            updatedUser.setHomeAddress(updatedHomeAdress);
        }

        
        return userMapper.toUserDto(userRepository.save(updatedUser));
    }

    public UserDto updatePassword(@Valid UpdatePasswordDto passwordDto) {
        User updatedUser = getUser(passwordDto.getLogin());
        if (passwordEncoder.matches(CharBuffer.wrap(passwordDto.getCurrentPassword()), updatedUser.getPassword())) {
            updatedUser.setPassword(passwordEncoder.encode(CharBuffer.wrap(passwordDto.getNewPassword())));
            userRepository.save(updatedUser);
            return userMapper.toUserDto(userRepository.save(updatedUser));
        } else {
            throw new AppException("Invalid password", HttpStatus.UNAUTHORIZED);
        }
    }

    public UserDto addCard(@Valid SignUpDto user) {
        User updatedUser = getUser(user.getLogin());
        if (updatedUser.getCreditCards().size() < 3) {
            CreditCard newCard = CreditCard.builder()
                .expirationDate(user.getCardExpiry())
                .billingAdress(user.getBillingAddr())
                .cardType(user.getCardType())
                .cardNumber(user.getCardNumber())
                .build();
            ArrayList<CreditCard> creditCards = new ArrayList<>(updatedUser.getCreditCards());
            creditCards.add(newCard);
            updatedUser.setCreditCards(creditCards);
            return userMapper.toUserDto(userRepository.save(updatedUser));
        }
        //Should not reach this line
        throw new AppException("Card maximum has been reached", HttpStatus.UNAUTHORIZED);
    }

    public UserDto deleteCard(SignUpDto user, Long id) {
        User updatedUser = getUser(user.getLogin());
        ArrayList<CreditCard> updatedUserCards = new ArrayList<>(updatedUser.getCreditCards());
        updatedUserCards.removeIf(card -> card.getId().equals(id));
        updatedUser.setCreditCards(updatedUserCards);
        return userMapper.toUserDto(userRepository.save(updatedUser));
    }

    public void createActivationToken(User user, String token) {
        ActivationToken newToken = new ActivationToken();
        newToken.setUser(user);
        newToken.setToken(token);
        newToken.setExpiryDate(LocalDateTime.now().plusDays(1)); // Expires in 1 day
        activationTokenRepository.save(newToken);
    }

    public void sendActivationEmail(String email, String token) {
        String activationLink = "http://localhost:4200/activate-account";
        emailService.sendSimpleMessage(email, "Activate Your Account", "Please click on the following link to activate your account: " + activationLink + ".\n Use the following activation token: " + token);
    }

    public boolean activateAccount(String token) {
        ActivationToken activationToken = activationTokenRepository.findByToken(token);
        if (activationToken != null && !activationToken.isExpired()) {
            User user = activationToken.getUser();
            user.setActive(true);
            userRepository.save(user);
            activationTokenRepository.delete(activationToken); 
            return true;
        }
        return false;
    }

}
