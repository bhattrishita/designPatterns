package com.expensetracker_backend.expensetracker.controller;

import com.expensetracker_backend.expensetracker.dto.ExpenseRequestDto;
import com.expensetracker_backend.expensetracker.service.ExpenseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "http://localhost:3000")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @PostMapping("/add")
    public ResponseEntity<Map<String, Double>> addExpense(@RequestBody ExpenseRequestDto request) {
        Map<String, Double> result = expenseService.createExpense(request);
        return ResponseEntity.ok(result);
    }
}

