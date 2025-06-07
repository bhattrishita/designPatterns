package com.expensetracker_backend.expensetracker.split;

import com.expensetracker_backend.expensetracker.model.User;
import java.util.*;

public class PercentSplit implements SplitStrategy {
    @Override
    public Map<User, Double> calculateSplits(double totalAmount, List<User> participants, List<Double> percentages) {
        if (percentages.size() != participants.size()) throw new IllegalArgumentException("Percentage count mismatch");
        Map<User, Double> splits = new HashMap<>();
        for (int i = 0; i < participants.size(); i++) {
            splits.put(participants.get(i), totalAmount * percentages.get(i) / 100.0);
        }
        return splits;
    }
}
