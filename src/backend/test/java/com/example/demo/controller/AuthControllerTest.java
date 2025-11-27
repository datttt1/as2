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


import com.example.demo.controller.AuthController;
import com.example.demo.dto.userDTO.LoginResponse;
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

        // b) Mock return value từ service
        LoginResponse mockResponse = new LoginResponse(
                true,
                "Login Success",
                "FAKE_TOKEN_123"
        );

        when(authService.authenticate(any())).thenReturn(mockResponse);

        // gửi request vào controller
        mockMvc.perform(
                post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"testuser\",\"password\":\"testuser123\"}")
                )
                .andExpect(status().isOk());

        // c) Verify mocked interactions
        verify(authService, times(1)).authenticate(any());
    }
}
