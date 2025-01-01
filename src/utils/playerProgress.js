// Experience points needed for each level
export const LEVEL_THRESHOLDS = [
    0,      // Level 1
    100,    // Level 2
    250,    // Level 3
    500,    // Level 4
    1000,   // Level 5
    2000,   // Level 6
    4000,   // Level 7
    8000,   // Level 8
    16000,  // Level 9
    32000   // Level 10
];

// Achievement definitions
export const ACHIEVEMENTS = {
    FIRST_DRAWING: {
        id: 'first_drawing',
        title: 'First Masterpiece',
        description: 'Complete your first drawing',
        xp: 50
    },
    STREAK_MASTER: {
        id: 'streak_master',
        title: 'Streak Master',
        description: 'Get 5 correct drawings in a row',
        xp: 100
    },
    CATEGORY_EXPERT: {
        id: 'category_expert',
        title: 'Category Expert',
        description: 'Complete all words in a category',
        xp: 200
    },
    SPEED_DEMON: {
        id: 'speed_demon',
        title: 'Speed Demon',
        description: 'Complete a drawing in under 10 seconds',
        xp: 150
    },
    PERFECTIONIST: {
        id: 'perfectionist',
        title: 'Perfectionist',
        description: 'Get 10 perfect scores in a row',
        xp: 300
    }
};

// Calculate level based on XP
export const calculateLevel = (xp) => {
    return LEVEL_THRESHOLDS.findIndex(threshold => xp < threshold) || LEVEL_THRESHOLDS.length;
};

// Calculate XP needed for next level
export const xpForNextLevel = (currentXp) => {
    const currentLevel = calculateLevel(currentXp);
    return LEVEL_THRESHOLDS[currentLevel] - currentXp;
};

// Calculate rewards for completing a drawing
export const calculateRewards = (difficulty, timeBonus = 0) => {
    const baseXp = {
        easy: 10,
        medium: 25,
        hard: 50,
        expert: 100
    }[difficulty];

    return {
        xp: baseXp + timeBonus,
        coins: Math.floor((baseXp + timeBonus) / 2)
    };
};