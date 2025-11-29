package com.example.demo.service;

import org.springframework.stereotype.Service;

import com.example.demo.dto.userDTO.LoginResponse;
import com.example.demo.dto.userDTO.UserLoginRequest;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
@Service
public class AuthService {

    
    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    public LoginResponse authenticate (UserLoginRequest userLoginRequest) {

        //kiểm tra request hợp lệ
        if(!isValidRequest(userLoginRequest)) {
            return new LoginResponse(false, "Validation failed", null);
        }

        //truy xuất db
        User user = userRepository.findByUsername(userLoginRequest.getUsername());
        if(user == null) {
            return new LoginResponse(false, "Username not found", null);
        }


        if(!userLoginRequest.getPassword().equals(user.getPassword())) {
            return new LoginResponse(false, "Wrong Password", null);
        }

        return new LoginResponse(true, "Login Success", "FAKE_TOKEN_123");
    }


public boolean isValidRequest (UserLoginRequest req) {

    return req != null && 
            req.getUsername() !=null &&
            req.getPassword() != null &&
            req.getUsername().length() >= 3 &&
            req.getPassword().length() >= 6;
}
}
