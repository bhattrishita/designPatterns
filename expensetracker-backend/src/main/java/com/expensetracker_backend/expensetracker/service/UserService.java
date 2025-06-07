package com.expensetracker_backend.expensetracker.service;

import com.expensetracker_backend.expensetracker.dto.UserDto;
import com.expensetracker_backend.expensetracker.model.User;

public interface UserService {
//    User registerUser(UserDto userDto);

    User registerUser(UserDto request);

}
