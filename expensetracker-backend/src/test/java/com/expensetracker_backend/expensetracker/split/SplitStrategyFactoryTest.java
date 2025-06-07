package com.expensetracker_backend.expensetracker.split;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class SplitStrategyFactoryTest {

    @Test
    void testEqualSplitFactory() {
        SplitStrategy strategy = SplitStrategyFactory.getStrategy(SplitStrategyFactory.StrategyType.EQUAL);
        assertTrue(strategy instanceof EqualSplit);
    }

    @Test
    void testPercentSplitFactory() {
        SplitStrategy strategy = SplitStrategyFactory.getStrategy(SplitStrategyFactory.StrategyType.PERCENT);
        assertTrue(strategy instanceof PercentSplit);
    }

    @Test
    void testExactAmountSplitFactory() {
        SplitStrategy strategy = SplitStrategyFactory.getStrategy(SplitStrategyFactory.StrategyType.EXACT);
        assertTrue(strategy instanceof ExactAmountSplit);
    }
}
