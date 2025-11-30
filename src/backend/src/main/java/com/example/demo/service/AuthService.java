package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.dto.userDTO.LoginResponse;
import com.example.demo.dto.userDTO.UserLoginRequest;
import com.example.demo.dto.userDTO.UserResponse;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.util.JwtUtil;
@Service
public class AuthService {

    
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;

    @Autowired
    public AuthService(UserRepository userRepository, BCryptPasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.encoder = encoder;
    }

    @Autowired
    private JwtUtil jwtUtil;
    public LoginResponse authenticate (UserLoginRequest userLoginRequest) {

        //kiểm tra request  ko hợp lệ
        if(!isValidRequest(userLoginRequest)) {
            return new LoginResponse(false, "Validation failed", null,null);
        }

        //truy xuất db
        User user = userRepository.findByUsername(userLoginRequest.getUsername());
        if(user == null) {
            return new LoginResponse(false, "Username not found", null,null);
        }

        //check password hash

        if(!verifyPassword(userLoginRequest.getPassword(),user.getPassword())) {
            return new LoginResponse(false, "Wrong Password", null,null);
        }

        String token = jwtUtil.generateToken(userLoginRequest.getUsername());

        return new LoginResponse(true,
                                "Login Success",
                                         token,
                                          new UserResponse(user.getUsername(),user.getEmail()));
    }


public boolean isValidRequest (UserLoginRequest req) {

   return req != null &&
          isValidUsername(req.getUsername()) &&
          isValidPassword(req.getPassword());
}

    private boolean isValidUsername(String username) {
        String regex = "^[a-zA-Z0-9._-]{3,50}$";
        return username != null && username.matches(regex);
    }

    private boolean isValidPassword(String password) {
        String regex = "^(?=.*[A-Za-z])(?=.*\\d).{6,100}$";
        return password != null && password.matches(regex);
    }

        public String hashPassword(String rawPassword) {
        return encoder.encode(rawPassword);
    }

    public boolean verifyPassword(String raw, String hashed) {
        return encoder.matches(raw, hashed);
    }

}
