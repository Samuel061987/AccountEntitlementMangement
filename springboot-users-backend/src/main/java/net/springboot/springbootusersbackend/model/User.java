package net.springboot.springbootusersbackend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String firstName;
    private String lastName;

    private  String email;
    //private List<Role> roles = new ArrayList<>();
    private int role;

    private String password;
    private long accountNumber;
}
