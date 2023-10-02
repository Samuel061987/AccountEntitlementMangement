package net.springboot.springbootusersbackend.controller;

import net.springboot.springbootusersbackend.services.RoleServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/role")
@CrossOrigin
public class RoleController {
    @Autowired
    private RoleServices roleServices;

    @GetMapping("/getAll")
    public List list() {return roleServices.getAllRole();}
}
