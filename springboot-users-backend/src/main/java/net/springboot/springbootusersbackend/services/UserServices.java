package net.springboot.springbootusersbackend.services;

import net.springboot.springbootusersbackend.model.User;
import net.springboot.springbootusersbackend.model.UserResponse;

import java.util.List;
import java.util.Optional;

public interface UserServices {
     public UserResponse saveUser(User user);

    public List<User> getAllUsers();

    User findByEmail(String email);

    UserResponse findByEmailAndPassword(String email,String password);

    Optional<User> findById(int id);

    User saveUserById(User user,long id);
}
