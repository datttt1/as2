package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
@CrossOrigin(origins = "*") 
@RequestMapping("/api/user")

public class UserController {
    @Autowired
    private UserService userService;
    public UserController (UserService userService) {
        this.userService = userService;
    }
@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody UserLoginRequest request) {
    try {
        User user = userService.login(request.getUsername(), request.getPassword());
        UserResponse response = new UserResponse(user.getId(), user.getUsername(), user.getEmail());
        return ResponseEntity.ok(response); // trả về 200 + data
    } catch (RuntimeException ex) {
        // trả về 400 + message lỗi
        return ResponseEntity.badRequest().body(ex.getMessage());
    }
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
