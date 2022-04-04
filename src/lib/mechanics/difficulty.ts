type Difficulty = {
  pointMultiplier: number;
  speedMultiplier: number;
  lives: number;
};

type DifficultyList = {
  novice: Difficulty;
  adept: Difficulty;
  expert: Difficulty;
  legendary: Difficulty;
};

const difficulty: DifficultyList = {
  novice: {
    pointMultiplier: 0.5,
    speedMultiplier: 1,
    lives: 4,
  },
  adept: {
    pointMultiplier: 0.65,
    speedMultiplier: 1.15,
    lives: 3,
  },
  expert: {
    pointMultiplier: 0.8,
    speedMultiplier: 1.3,
    lives: 2,
  },
  legendary: {
    pointMultiplier: 1,
    speedMultiplier: 1.6,
    lives: 1,
  },
};

export type { Difficulty, DifficultyList }
export { difficulty };
