package com.expensetracker_backend.expensetracker.controller;

import com.expensetracker_backend.expensetracker.dto.UserDto;
import com.expensetracker_backend.expensetracker.model.User;
import com.expensetracker_backend.expensetracker.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    private final MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper();

    public UserControllerTest() {
        MockitoAnnotations.openMocks(this);
        this.mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @Test
    void testRegisterUser_Success() throws Exception {
        UserDto dto = new UserDto();
        dto.setName("Rishita");
        dto.setEmail("rishita@example.com");
        dto.setPhone("9876543210");
        dto.setPassword("secure123");
        dto.setProfilePic("https://example.com/avatar.jpg");

        User expectedUser = User.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .password(dto.getPassword())
                .profilePic(dto.getProfilePic())
                .build();

        when(userService.registerUser(dto)).thenReturn(expectedUser);

        mockMvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Rishita"))
                .andExpect(jsonPath("$.email").value("rishita@example.com"));
    }
}