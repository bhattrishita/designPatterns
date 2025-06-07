package com.expensetracker_backend.expensetracker.split;

import com.expensetracker_backend.expensetracker.model.User;
import java.util.*;

public class ExactAmountSplit implements SplitStrategy {
    @Override
    public Map<User, Double> calculateSplits(double totalAmount, List<User> participants, List<Double> amounts) {
        if (amounts.size() != participants.size()) throw new IllegalArgumentException("Amount count mismatch");
        Map<User, Double> splits = new HashMap<>();
        for (int i = 0; i < participants.size(); i++) {
            splits.put(participants.get(i), amounts.get(i));
        }
        return splits;
    }
}
