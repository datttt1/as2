package com.example.demo.security;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.demo.dto.userDTO.LoginResponse;
import com.example.demo.dto.userDTO.UserLoginRequest;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.AuthService;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS) 

public class AuthSecurityTest {
    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository;

@BeforeAll
    void setUp() {
        userRepository.deleteAll();

        User user = new User();
        user.setUsername("admin1");
        user.setPassword("admin123"); 
        user.setEmail("admin123456@gmail.com");// chưa hash → test theo đề bài
        userRepository.save(user);
    }

    @Test
    @DisplayName(" Test SQL Injection vào username")
    void sqlInjectionUsernameTest() {
        UserLoginRequest req = new UserLoginRequest();
        req.setUsername("' OR '1'='1");
        req.setPassword("anything");

        LoginResponse res = authService.authenticate(req);

        assertFalse(res.isSuccess());
        assertEquals("Validation failed", res.getMessage());
    }

    @Test
    @DisplayName(" Test XSS Injection trong username")
    void xssInjectionTest() {
        UserLoginRequest req = new UserLoginRequest();
        req.setUsername("<script>alert(1)</script>");
        req.setPassword("admin123");

        LoginResponse res = authService.authenticate(req);

        assertFalse(res.isSuccess());
        assertEquals("Validation failed", res.getMessage());
    }

    @Test
    @DisplayName("Khong dc login khi password trong")
    void byPassEmptyPassword() {
        UserLoginRequest req = new UserLoginRequest();
        req.setUsername("admin1");
        req.setPassword("");

        LoginResponse res = authService.authenticate(req);

        assertFalse(res.isSuccess());
        assertEquals("Validation failed", res.getMessage());
    }

    @Test
    @DisplayName("khong dc login bang SQL Injection trong password")
    void byPassSqlInjection() {
        UserLoginRequest req = new UserLoginRequest();
        req.setUsername("admin1");
        req.setPassword("' OR '1'='1");

        LoginResponse res = authService.authenticate(req);

        assertFalse(res.isSuccess());
        assertEquals("Validation failed", res.getMessage());
    }
}

