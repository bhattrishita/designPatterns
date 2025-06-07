package com.expensetracker_backend.expensetracker.service.impl;

import com.expensetracker_backend.expensetracker.dto.ExpenseRequestDto;
import com.expensetracker_backend.expensetracker.model.User;
import com.expensetracker_backend.expensetracker.repository.UserRepository;
import com.expensetracker_backend.expensetracker.service.ExpenseService;
import com.expensetracker_backend.expensetracker.split.SplitStrategy;
import com.expensetracker_backend.expensetracker.split.SplitStrategyFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ExpenseServiceImpl implements ExpenseService {

    private final UserRepository userRepository;

    public ExpenseServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Map<String, Double> createExpense(ExpenseRequestDto request) {
        List<User> users = userRepository.findAllById(request.getParticipantIds());
        SplitStrategy strategy = SplitStrategyFactory.getStrategy(
                SplitStrategyFactory.StrategyType.valueOf(request.getStrategyType().toUpperCase())
        );

        Map<User, Double> splits = strategy.calculateSplits(
                request.getTotalAmount(),
                users,
                request.getCustomValues()
        );

        // Convert to a simple map of names for frontend display
        return splits.entrySet().stream()
                .collect(Collectors.toMap(e -> e.getKey().getName(), Map.Entry::getValue));
    }
}

