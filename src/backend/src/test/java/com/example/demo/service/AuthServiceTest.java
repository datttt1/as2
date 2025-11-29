package com.example.demo.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.demo.dto.userDTO.LoginResponse;
import com.example.demo.dto.userDTO.UserLoginRequest;

@ExtendWith(MockitoExtension.class)

 class AuthServiceTest {
    private AuthService authService;
    
    @BeforeEach
    void setUp() {
        authService = new AuthService();

    }

@Test
@DisplayName("Login Success")
    void testLoginSuccess () {
        UserLoginRequest req = new UserLoginRequest();
        req.setUsername("testuser");
        req.setPassword("testuser123"); 

        LoginResponse res = authService.authenticate(req);
        
        assertTrue(res.isSuccess());
        assertEquals("Login Success", res.getMessage());
        assertNotNull(res.getToken());
        
}

@Test
@DisplayName("Username not found")
    void testUsernameNotFound () {
        UserLoginRequest req = new UserLoginRequest();
        req.setUsername("abc");
        req.setPassword("testuser123");

        LoginResponse res = authService.authenticate(req);

        assertFalse(res.isSuccess());
        assertEquals("Username not found", res.getMessage());
    }

@Test
@DisplayName("Wrong Password")
    void testPassword () {
        UserLoginRequest req = new UserLoginRequest();
        req.setUsername("testuser");
        req.setPassword("testuser12");

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
