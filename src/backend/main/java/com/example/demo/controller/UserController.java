package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.userDTO.UserLoginRequest;
import com.example.demo.dto.userDTO.UserRegisterRequest;
import com.example.demo.dto.userDTO.UserResponse;
import com.example.demo.entity.User;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/api/user")

public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public UserResponse login(@RequestBody UserLoginRequest request) {
        User user = userService.login(request.getUsername(), request.getPassword());
        return new UserResponse(user.getId(), user.getUsername(), user.getEmail());
    }

    @PostMapping("/register")
    public UserResponse register(@RequestBody UserRegisterRequest request) {
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(request.getPassword());
        user.setEmail(request.getEmail());
        User savedUser = userService.register(user);
        return new UserResponse(savedUser.getId(), savedUser.getUsername(), savedUser.getEmail());
    }

}
