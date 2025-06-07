package com.expensetracker_backend.expensetracker.split;

import com.expensetracker_backend.expensetracker.model.User;
import java.util.List;
import java.util.Map;

public interface SplitStrategy {
    Map<User, Double> calculateSplits(double totalAmount, List<User> participants, List<Double> customValues);
}
