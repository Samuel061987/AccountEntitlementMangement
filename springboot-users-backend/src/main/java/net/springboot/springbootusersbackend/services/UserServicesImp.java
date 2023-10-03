package net.springboot.springbootusersbackend.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import jakarta.persistence.Persistence;
import jakarta.persistence.PersistenceException;
import net.springboot.springbootusersbackend.exceptions.ApiException;
import net.springboot.springbootusersbackend.exceptions.ApiRequestException;
import net.springboot.springbootusersbackend.model.User;
import net.springboot.springbootusersbackend.model.UserResponse;
import net.springboot.springbootusersbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.SignatureAlgorithm;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import java.util.*;
import io.jsonwebtoken.Jwts;

@Service
public class UserServicesImp implements UserServices {
    @Value("${jwt.secret}")
    private String secret;
    @Autowired
    private UserRepository userRepository;
    @Override
    public UserResponse saveUser(User user) {
        try {
            userRepository.save(user);
        }
        catch (PersistenceException p){
            throw new ApiRequestException(p.getMessage());
        }
        return new UserResponse(user.getEmail(),user.getRole(), generateToken(user));
    }

    public String generateToken(User user) {

        Claims claims = Jwts.claims().setSubject(user.getEmail());
        return Jwts.builder()
                .setClaims(claims)
                .signWith(SignatureAlgorithm.HS512, secret)
                .setExpiration(new Date((new Date()).getTime() + 50000))
                .compact();
    }
    @Override
    public List<User> getAllUsers(String token) {
        try {
            Claims claims=parseToken(token);
            if(claims.getExpiration().after(new Date()) && userRepository.findByEmail(claims.getSubject())!=null){
                return userRepository.findAll();
            }
           else{
               throw new ApiRequestException("Invalid Authentication token");
           }
        }
        catch (PersistenceException p){
            throw new ApiRequestException(p.getMessage());
        }

    }
    @Override
    public Optional<User> findById(int id) {
        try {
            return userRepository.findById((long) id);
        }
        catch (PersistenceException p){
            throw new ApiRequestException(p.getMessage());
        }

    }
//    @Override
    public  User findByEmail(String email) {
        try {
            return userRepository.findByEmail((String) email);
        }
         catch (PersistenceException p){
            throw new ApiRequestException(p.getMessage());
        }
    }
   public User saveUserById(User user,long id){
       try {
           return userRepository.findById((long) id)
                   .map(user1 -> {
                       user1.setAccountNumber(user.getAccountNumber());
                       return userRepository.save(user1);
                   }).orElse(new User());
       }catch (PersistenceException p){
           throw new ApiRequestException(p.getMessage());
       }

   }
    public  UserResponse findByEmailAndPassword(String email,String password){
        try {
             User user= userRepository.findByEmailAndPassword((String) email, (String) password);
            if(user!= null) {

                return new UserResponse(user.getEmail(), user.getRole(),generateToken(user));
            }else{
                return null;
            }

        }
        catch (PersistenceException p){
                throw new ApiRequestException(p.getMessage());
            }
    }
    public Claims parseToken(String token) {
        try {
            Claims body = Jwts.parser()
                    .setSigningKey(secret)
                    .parseClaimsJws(token)
                    .getBody();
            return body;

        } catch (JwtException | ClassCastException e) {
            throw  new ApiRequestException(e.getMessage());
        }
    }
}
