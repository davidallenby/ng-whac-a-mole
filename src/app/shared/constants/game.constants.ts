import { GameLevel, GameState, MoleType } from "@shared/interfaces/game.interfaces";

export namespace GAME {
  // Game difficulty settings.
  export const LEVELS: GameLevel[] = [
    {
      // 0 == Easy
      // 1 == Medium
      // 2 == Hard
      levelId: 0,
      levelName: 'Easy 😎',
      // How long/short the mole will appear for
      minVisibility: 700,
      maxVisibility: 1000
    },
    {
      levelId: 1,
      levelName: 'Medium 😧',
      minVisibility: 500,
      maxVisibility: 800
    },
    {
      levelId: 2,
      levelName: 'Hard 🤯',
      minVisibility: 450,
      maxVisibility: 750
    }
  ]

  // The time limit on the clock.
  export const TIME_LIMIT: number = 30;

  // Types of characters that appear in the game.
  // Define probability ranges:
  // -- 5% chance of getting super mole (+1 point when clicked)
  // -- 15% chance of getting mega mole (+2 points when clicked)
  // -- 80% chance of getting regular mole (+3 points when clicked)
  export const MOLE_TYPES: MoleType[] = [
    {
      moleTypeId: 1,
      moleTypeName: 'Regular mole',
      moleProbability: 0.82
    },
    {
      moleTypeId: 2,
      moleTypeName: 'Mega mole',
      moleProbability: 0.13
    },
    {
      moleTypeId: 3,
      moleTypeName: 'Super mole',
      moleProbability: 0.05
    },
  ];

  export const DEFAULT_STATE: GameState = {
    currentScore: 0,
    highScore: 0,
    levelId: 0, 
    inProgress: false
  }
}