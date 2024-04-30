package com.CSCI4050.jwt.backend.entites;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.ColumnDefault;

import com.CSCI4050.jwt.backend.enums.Role;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "app_user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name", nullable = false)
    @Size(max = 100)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    @Size(max = 100)
    private String lastName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(nullable = false, unique = true)
    @Size(max = 100)
    private String login;

    @Column(nullable = false)
    @Size(max = 100)
    private String password;

    @Builder.Default
    private boolean isActive = false;

    private String phoneNumber;

    @Builder.Default
    private boolean promotionsEnabled = false;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @Builder.Default
    private List<CreditCard> creditCards = new ArrayList<>();

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id")
    @Builder.Default
    private Adress homeAddress = new Adress();

    @Builder.Default
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Ticket> tickets = new ArrayList<>();

}
