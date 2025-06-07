package com.expensetracker_backend.expensetracker.split;

import com.expensetracker_backend.expensetracker.model.User;
import org.junit.jupiter.api.Test;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

class SplitStrategyTest {

    private final User user1 = User.builder().name("A").build();
    private final User user2 = User.builder().name("B").build();
    private final User user3 = User.builder().name("C").build();

    @Test
    void testEqualSplit() {
        SplitStrategy strategy = new EqualSplit();
        Map<User, Double> result = strategy.calculateSplits(90.0, List.of(user1, user2, user3), null);

        assertEquals(30.0, result.get(user1));
        assertEquals(30.0, result.get(user2));
        assertEquals(30.0, result.get(user3));
    }

    @Test
    void testPercentSplit() {
        SplitStrategy strategy = new PercentSplit();
        List<Double> percentages = List.of(50.0, 30.0, 20.0);

        Map<User, Double> result = strategy.calculateSplits(100.0, List.of(user1, user2, user3), percentages);

        assertEquals(50.0, result.get(user1));
        assertEquals(30.0, result.get(user2));
        assertEquals(20.0, result.get(user3));
    }

    @Test
    void testExactSplit() {
        SplitStrategy strategy = new ExactAmountSplit();
        List<Double> amounts = List.of(40.0, 30.0, 30.0);

        Map<User, Double> result = strategy.calculateSplits(100.0, List.of(user1, user2, user3), amounts);

        assertEquals(40.0, result.get(user1));
        assertEquals(30.0, result.get(user2));
        assertEquals(30.0, result.get(user3));
    }
}