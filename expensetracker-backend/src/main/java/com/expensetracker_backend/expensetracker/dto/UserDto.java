package com.expensetracker_backend.expensetracker.dto;

import lombok.Data;

@Data
public class UserDto {
    private String name;
    private String email;
    private String phone;
    private String password;
    private String profilePic;
}

