package com.expensetracker_backend.expensetracker.split;

import com.expensetracker_backend.expensetracker.model.User;
import java.util.*;

public class EqualSplit implements SplitStrategy {
    @Override
    public Map<User, Double> calculateSplits(double totalAmount, List<User> participants, List<Double> unused) {
        double splitAmount = totalAmount / participants.size();
        Map<User, Double> splits = new HashMap<>();
        for (User user : participants) {
            splits.put(user, splitAmount);
        }
        return splits;
    }
}
