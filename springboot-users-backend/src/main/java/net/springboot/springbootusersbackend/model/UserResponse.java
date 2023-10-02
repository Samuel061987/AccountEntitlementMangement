package net.springboot.springbootusersbackend.model;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
public class UserResponse {

    private  String email;
    //private List<Role> roles = new ArrayList<>();
    private int role;
    private String token;

}

