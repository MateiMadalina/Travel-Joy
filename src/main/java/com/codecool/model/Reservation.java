package com.codecool.model;

import com.codecool.model.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString
@Table(name = "reservations")
//@JsonIdentityInfo(
//        generator = ObjectIdGenerators.PropertyGenerator.class,
//        property = "id")
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate check_in;
    private LocalDate check_out;
    private String email;
    private String phoneNumber;
    private String name;
    private String country;
    private String county;
    private String city;
    private Integer amount;
    private Boolean bought;

    @ManyToOne
    @JsonIgnore
    private User user;

    @JsonIgnore
    @ManyToOne
    private Room room;

    @JsonIgnore
    @OneToOne(mappedBy = "reservation")
    private TravelPackage travelPackage;
}
