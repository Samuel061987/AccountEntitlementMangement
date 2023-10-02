package net.springboot.springbootusersbackend.services;

import net.springboot.springbootusersbackend.model.Role;
import net.springboot.springbootusersbackend.model.User;
import net.springboot.springbootusersbackend.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServicesImp implements RoleServices {
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public List<Role> getAllRole() {
        return roleRepository.findAll();
    };

}
