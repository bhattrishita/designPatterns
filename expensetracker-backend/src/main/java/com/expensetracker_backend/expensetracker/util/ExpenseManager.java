package com.expensetracker_backend.expensetracker.util;

import com.expensetracker_backend.expensetracker.model.User;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Singleton class responsible for managing shared expense balances.
 */
public class ExpenseManager {

    private static volatile ExpenseManager instance;

    private final Map<String, Double> balances;

    // Private constructor to restrict instantiation
    private ExpenseManager() {
        balances = new ConcurrentHashMap<>();
    }

    // Thread-safe lazy initialization (Double-Checked Locking)
    public static ExpenseManager getInstance() {
        if (instance == null) {
            synchronized (ExpenseManager.class) {
                if (instance == null) {
                    instance = new ExpenseManager();
                }
            }
        }
        return instance;
    }
    private final Map<String, Double> balanceSheet = new HashMap<>();


    // Operations on shared balance data
    public void updateBalance(String userKey, double amount) {
        balances.put(userKey, balances.getOrDefault(userKey, 0.0) + amount);
    }

    public double getBalance(String userKey) {
        return balances.getOrDefault(userKey, 0.0);
    }

    public Map<String, Double> getAllBalances() {
        return balances;
    }
    public void addBalance(User paidBy, User owes, double amount) {
        String key = paidBy.getId() + "_" + owes.getId();
        balanceSheet.put(key, balanceSheet.getOrDefault(key, 0.0) + amount);
    }


    public void printAllBalances() {
        for (Map.Entry<String, Double> entry : balanceSheet.entrySet()) {
            System.out.println(entry.getKey() + " -> " + entry.getValue());
        }
    }

}
