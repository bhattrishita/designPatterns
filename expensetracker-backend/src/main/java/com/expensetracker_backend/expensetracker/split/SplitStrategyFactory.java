package com.expensetracker_backend.expensetracker.split;

public class SplitStrategyFactory {

    public enum StrategyType {
        EQUAL,
        PERCENT,
        EXACT
    }

    public static SplitStrategy getStrategy(StrategyType type) {
        return switch (type) {
            case EQUAL -> new EqualSplit();
            case PERCENT -> new PercentSplit();
            case EXACT -> new ExactAmountSplit();
        };
    }
}
