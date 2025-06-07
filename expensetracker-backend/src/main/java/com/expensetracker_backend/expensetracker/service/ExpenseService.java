package com.expensetracker_backend.expensetracker.service;

import com.expensetracker_backend.expensetracker.dto.ExpenseRequestDto;

import java.util.Map;

public interface ExpenseService {
    Map<String, Double> createExpense(ExpenseRequestDto request);

}

