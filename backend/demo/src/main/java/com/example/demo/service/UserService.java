package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    
    private boolean isValidUsername(String username) {
        String regex = "^[a-zA-Z0-9._-]{3,50}$";
        return username != null && username.matches(regex);
    }

    private boolean isValidPassword(String password) {
        String regex = "^(?=.*[A-Za-z])(?=.*\\d).{6,100}$";
        return password != null && password.matches(regex);
    }

    private void isValidEmail(String email) {
        if(email.trim().isEmpty() || email.length() < 5) {
            throw new RuntimeException("Email khong hop le");
        }
    }

    public User login(String username , String password) {
        if(!isValidUsername(username)) {
            throw new RuntimeException("Username không hợp lệ! (3-50 ký tự, chỉ chứa a-z, A-Z, 0-9, -, ., _)");
        }

        if(!isValidPassword(password)) {
            throw new RuntimeException("Password không hợp lệ! (6-100 ký tự, phải có chữ và số)");
        }

        User user = userRepository.findByUsername(username);
        if(user == null) {
            throw new RuntimeException("User khong ton tai");
        }

        if(!user.getPassword().equals(password)) {
            throw new RuntimeException("Sai mat khau");
        }

        return user;
    }

    public User register(User user) {
        return userRepository.save(user);
    }

}
