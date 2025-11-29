package com.example.demo.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;

@ExtendWith(MockitoExtension.class)

class UserServiceTest {
	private UserRepository userRepository;
	private UserService userService;
	private User user;

	@BeforeEach
	void init() {
		userRepository = mock(UserRepository.class);
		userService = new UserService(userRepository);
		user = new User();
		user.setUsername("testuser");
		user.setId(1);
		user.setPassword("123456dat");
		user.setEmail("test123@gmail.com");
	}
	@Test
	@DisplayName("Login success")
	void testLoginSuccess() {

		when(userRepository.findByUsername("testuser")).thenReturn(user);

		User result = userService.login("testuser", "123456dat");

		assertEquals("testuser", result.getUsername());
		assertEquals("123456dat", result.getPassword());
	}

	@Test
	@DisplayName("Username khong ton tai")
	void testLoginUserNotFound() {
    when(userRepository.findByUsername("testuser")).thenReturn(null);

    RuntimeException ex = assertThrows(RuntimeException.class, () -> userService.login("testuser", "123456dat"));

    assertEquals("User khong ton tai", ex.getMessage());
	}

	@Test
	@DisplayName("Wrong Password")
	void testWrongPassword() {
		when(userRepository.findByUsername("testuser")).thenReturn(user);

		RuntimeException ex = assertThrows(RuntimeException.class, () -> userService.login("testuser", "123456datt"));

		assertEquals("Sai mat khau", ex.getMessage());
	}

	@Test
	@DisplayName("Username khong hop le")
	void testInvalidUsername() {
    RuntimeException ex = assertThrows(RuntimeException.class, () -> userService.login("te", "123456dat"));

	assertEquals("Username không hợp lệ! (3-50 ký tự, chỉ chứa a-z, A-Z, 0-9, -, ., _)", ex.getMessage());
	}

	@Test
	@DisplayName("Password khong hop le")
	void testInvalidPassword() {
		RuntimeException ex = assertThrows(RuntimeException.class, () -> userService.login("testuser", "123"));

		assertEquals("Password không hợp lệ! (6-100 ký tự, phải có chữ và số)" , ex.getMessage());
	}


}
