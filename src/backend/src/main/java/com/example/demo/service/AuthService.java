package com.example.demo.service;

import org.springframework.stereotype.Service;

import com.example.demo.dto.userDTO.LoginResponse;
import com.example.demo.dto.userDTO.UserLoginRequest;
@Service
public class AuthService {
    public LoginResponse authenticate (UserLoginRequest userLoginRequest) {
        if(!isValidRequest(userLoginRequest)) {
            return new LoginResponse(false, "Validation failed", null);
        }

        if(!"testuser".equals(userLoginRequest.getUsername())) {
            return new LoginResponse(false, "Username not found", null);
        }

        if(!"testuser123".equals(userLoginRequest.getPassword())) {
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
