export interface GameLevel {
  // The difficulty of the game:
  // -- 0 == Easy
  // -- 1 == Medium
  // -- 2 == Hard
  levelId: 0 | 1 | 2;
  levelName: 'Easy 😎'|'Medium 😧'|'Hard 🤯';
  // Time the mole stays visible for
  minVisibility: number;
  maxVisibility: number;
}

export interface MoleType {
  moleTypeId: number;
  moleTypeName: string;
  moleProbability: number;
}

export interface GameState {
  levelId: number; // Current difficulty level
  currentScore: number;
  highScore: number;
  inProgress: boolean; // Hide start button, disable difficulty settings
}