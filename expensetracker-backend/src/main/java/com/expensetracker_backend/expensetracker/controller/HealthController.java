package com.expensetracker_backend.expensetracker.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class HealthController {

    @GetMapping("/ping")
    public String ping() {
        return "Pong from Splitwise Backend!";
    }
    // If using Spring Boot
    @GetMapping("/api/test")
    public ResponseEntity<Map<String, String>> testConnection() {
        return ResponseEntity.ok(Map.of("message", "Backend is connected!"));
    }
}

