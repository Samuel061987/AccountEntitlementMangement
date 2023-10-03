package net.springboot.springbootusersbackend.repository;

import net.springboot.springbootusersbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    @Query("SELECT u FROM User u WHERE u.email = ?1")
    public User findByEmail(String email);
    @Query("SELECT u FROM User u WHERE u.email = ?1 and u.password=?2")
    public User findByEmailAndPassword(String email ,String password);

}
