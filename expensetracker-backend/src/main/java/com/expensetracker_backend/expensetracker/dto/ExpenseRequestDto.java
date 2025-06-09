package com.expensetracker_backend.expensetracker.dto;

import lombok.Data;

import java.util.List;

@Data
public class ExpenseRequestDto {
    private double totalAmount;
    private List<Long> participantIds; // IDs of users
    private String strategyType; // "EQUAL", "PERCENT", "EXACT"
    private List<Double> customValues; // null or [percentages] or [amounts]

    private Long paidBy; // ID of the user who paid

}


