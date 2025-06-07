package com.expensetracker_backend.expensetracker.controller;

import com.expensetracker_backend.expensetracker.dto.UserDto;
import com.expensetracker_backend.expensetracker.model.User;
import com.expensetracker_backend.expensetracker.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000") // or whatever your React origin is
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public User register(@RequestBody UserDto userDto) {
        return userService.registerUser(userDto);
    }
}

