package com.example.demo.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
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

@SpringBootTest  // Tạo Spring context để autowire
@TestInstance(TestInstance.Lifecycle.PER_CLASS) 

 class AuthServiceTest {
    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository;
    
    @BeforeAll
    void setUp() {
        userRepository.deleteAll();
        User user = new User();
        user.setUsername("admin12");
        user.setPassword(authService.hashPassword("admin123"));
        user.setEmail("admin12345@gmail.com");
        userRepository.save(user);

    }

@Test
@DisplayName("Login Success")
    void testLoginSuccess () {
        UserLoginRequest req = new UserLoginRequest();
        req.setUsername("admin12");
        req.setPassword("admin123"); 

        LoginResponse res = authService.authenticate(req);
        
        assertTrue(res.isSuccess());
        assertEquals("Login Success", res.getMessage());
        assertNotNull(res.getToken());

        
}

@Test
@DisplayName("Username not found")
    void testUsernameNotFound () {
        UserLoginRequest req = new UserLoginRequest();
        req.setUsername("admin2");
        req.setPassword("admin123");

        LoginResponse res = authService.authenticate(req);

        assertFalse(res.isSuccess());
        assertEquals("Username not found", res.getMessage());

    }

@Test
@DisplayName("Wrong Password")
    void testPassword () {
        UserLoginRequest req = new UserLoginRequest();
        req.setUsername("admin12");
        req.setPassword("admin12345");

        LoginResponse res = authService.authenticate(req);

        assertFalse(res.isSuccess());
        assertEquals("Wrong Password", res.getMessage());

    }

@Test
@DisplayName("Validation Error")
    void testValidation() {
        UserLoginRequest req = new UserLoginRequest();
        req.setUsername("ab");
        req.setPassword("123");

        LoginResponse res = authService.authenticate(req);
        assertFalse(res.isSuccess());
        assertEquals("Validation failed", res.getMessage());

    }

@Test
@DisplayName("Validation hop le")
    void testValidationValid() {
        UserLoginRequest req = new UserLoginRequest();
        req.setUsername("abcdef");
        req.setPassword("testuser12323");

        assertTrue(authService.isValidRequest(req));

    }

@Test
@DisplayName("Validation ko hop le")
    void testValidationInvalid() {
        UserLoginRequest req = new UserLoginRequest();
        req.setUsername("ac");
        req.setUsername("123");

        assertFalse(authService.isValidRequest(req));


    }
}
