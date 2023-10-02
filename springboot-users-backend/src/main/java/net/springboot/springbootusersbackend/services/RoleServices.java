package net.springboot.springbootusersbackend.services;

import net.springboot.springbootusersbackend.model.Role;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface RoleServices{
        public List<Role> getAllRole();
}
