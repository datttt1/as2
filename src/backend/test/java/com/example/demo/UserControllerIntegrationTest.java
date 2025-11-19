package com.example.demo;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.Mockito;
import static org.mockito.Mockito.when;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.example.demo.controller.UserController;
import com.example.demo.dto.userDTO.UserLoginRequest;
import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;


@WebMvcTest(UserController.class)
public class UserControllerIntegrationTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;
    @MockBean
    private UserService userService;
    
    //test post api/user/login

    @Test
    @DisplayName("POST /api/user/login success")
    void testLoginSuccess() throws Exception{
        UserLoginRequest request = new UserLoginRequest();
        request.setPassword("123456dat");
        request.setUsername("testuser");

        User fakeUser = new User();
        fakeUser.setId(1);
        fakeUser.setUsername("testuser");
        fakeUser.setEmail("test123@gmail.com");

        when(userService.login(any(), any())).thenReturn(fakeUser);
        mockMvc.perform(post("/api/user/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value(1))
            .andExpect(jsonPath("$.username").value("testuser"))
            .andExpect(jsonPath("$.email").value("test123@gmail.com"));
    }

    //test response structure + status
        @Test
    @DisplayName("POST /api/user/login - Sai thông tin, trả về 400")
    void testLoginInvalid() throws Exception {

        UserLoginRequest request = new UserLoginRequest();
        request.setUsername("testuser");
        request.setPassword("123456datt");

        when(userService.login(any(), any()))
                .thenThrow(new RuntimeException("Sai mật khẩu"));

        mockMvc.perform(post("/api/user/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest());
    }

    //test cors + header

       @Test
    @DisplayName("POST /api/user/login - Check CORS headers")
    void testCorsHeaders() throws Exception {

        UserLoginRequest request = new UserLoginRequest();
        request.setUsername("testuser");
        request.setPassword("123456");

        User fakeUser = new User();
        fakeUser.setId(1);
        fakeUser.setUsername("testuser");
        fakeUser.setEmail("test@gmail.com");

        when(userService.login(any(), any())).thenReturn(fakeUser);

        mockMvc.perform(
                post("/api/user/login")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Origin", "http://localhost:3000")
                .content(objectMapper.writeValueAsString(request))
            )
            .andExpect(status().isOk())
            .andExpect(header().exists("Access-Control-Allow-Origin"));
    }

}
