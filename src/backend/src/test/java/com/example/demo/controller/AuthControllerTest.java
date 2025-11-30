package com.example.demo.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.springframework.http.MediaType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;


import com.example.demo.dto.userDTO.LoginResponse;
import com.example.demo.dto.userDTO.UserLoginRequest;
import com.example.demo.dto.userDTO.UserResponse;
import com.example.demo.service.AuthService;

@WebMvcTest(AuthController.class)
 class AuthControllerTest {

  @Autowired
    private MockMvc mockMvc;

    // a) Mock AuthService
    @MockBean
    private AuthService authService;

    @Test
    @DisplayName("Mock: Controller với mocked service - success")
    void testLoginWithMockedService() throws Exception {

        UserLoginRequest req = new UserLoginRequest();
        req.setUsername("testuser123");
        req.setPassword("user123456");
        
        

        // b) Mock return value từ service
        LoginResponse mockResponse = new LoginResponse(
                true,
                "Login Success",
                "token",
                new UserResponse("testuser123","test1@gmail.com"));

        when(authService.authenticate(any())).thenReturn(mockResponse);

        // gửi request vào controller
        mockMvc.perform(
                post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"testuser123\",\"password\":\"user123456\"}")
                )
                .andExpect(status().isOk());

        // c) Verify mocked interactions
        verify(authService, times(1)).authenticate(any());
    }


@Test
@DisplayName("CORS: Cho phép cross-origin headers")
void testCorsHeaders() throws Exception {

    LoginResponse mockResponse = new LoginResponse(
            true,
            "Login Success",
            "token123",
            new UserResponse("corsuser", "cors@gmail.com")
    );

    when(authService.authenticate(any())).thenReturn(mockResponse);

    mockMvc.perform(
            post("/api/auth/login")
                    .contentType(MediaType.APPLICATION_JSON)
                    .header("Origin", "http://example.com")   // gửi CORS request
                    .content("{\"username\":\"corsuser\",\"password\":\"Test123\"}")
    )
    .andExpect(status().isOk())
    .andExpect(header().exists("Access-Control-Allow-Origin"))
    .andExpect(header().string("Access-Control-Allow-Origin", "*"))
    .andExpect(header().string("Content-Type", "application/json"));
}


@Test
@DisplayName("POST /api/auth/login - Kiểm tra response structure")
void testLoginResponseStructure() throws Exception {

    LoginResponse mockResponse = new LoginResponse(
            true,
            "Login Success",
            "token123",
            new UserResponse("testuser", "test@gmail.com")
    );

    when(authService.authenticate(any())).thenReturn(mockResponse);

    mockMvc.perform(
            post("/api/auth/login")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("{\"username\":\"testuser\",\"password\":\"Test123\"}")
    )
    .andExpect(status().isOk())
    .andExpect(jsonPath("$.success").value(true))
    .andExpect(jsonPath("$.message").value("Login Success"))
    .andExpect(jsonPath("$.token").value("token123"))
    .andExpect(jsonPath("$.user.username").value("testuser"))
    .andExpect(jsonPath("$.user.email").value("test@gmail.com"));
}

}
