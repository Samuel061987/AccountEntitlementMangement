package net.springboot.springbootusersbackend.controller;

import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import net.springboot.springbootusersbackend.exceptions.ApiException;
import net.springboot.springbootusersbackend.exceptions.ApiRequestException;
import net.springboot.springbootusersbackend.model.User;
import net.springboot.springbootusersbackend.model.UserResponse;
import net.springboot.springbootusersbackend.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
    @Autowired
    private UserServices userServices;

    @PostMapping("/createUser")
    public ResponseEntity<Object> create(@RequestBody User user)
    {
        try {
            if (userServices.findByEmail(user.getEmail()) == null) {
                return ResponseEntity.ok(userServices.saveUser(user));
            } else {
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }
        }
        catch (ApiRequestException e){
            throw new ApiRequestException(e.getMessage());
        }

    }
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody User user){
        try {
            UserResponse userResponse = userServices.findByEmailAndPassword(user.getEmail(), user.getPassword());
            if (userResponse == null) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
             }
            else{
                return ResponseEntity.ok(userResponse);
            }
        }
        catch (ApiRequestException e){
            throw new ApiRequestException(e.getMessage());
        }

    }

    @PutMapping("/updateAccountNumber/{id}")
    public User updateAccountNumber(@PathVariable("id") long id,@RequestBody User user)
    {
       // User currentUser = userRepo.findOne(id);
       return userServices.saveUserById(user,id);
    }

    @GetMapping("/getAll")
    public List<User> list(HttpServletRequest httpServletRequest){
        String token = httpServletRequest.getHeader("Authorization");
        System.out.println(token);
        return userServices.getAllUsers(token);
    }

    @GetMapping("/getUserById/{id}")
    public Optional<User> getByUserId(@PathVariable("id") int id){
        try {
              return userServices.findById(id);
        }
        catch (ApiRequestException ex){
            throw new ApiRequestException("Can't call the values");
        }

    }
}
