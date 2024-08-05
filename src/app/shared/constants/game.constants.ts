import { GameLevel, GameState, MoleType } from "@shared/interfaces/game.interfaces";

export namespace GAME {
  // Game difficulty settings.
  export const LEVELS: GameLevel[] = [
    {
      levelId: 0,
      levelName: 'Easy 😎',
      // How long/short the mole will appear for
      minVisibility: 1000,
      maxVisibility: 1500,
      // How long between mole mole appearance
      minDelay: 1000,
      maxDelay: 2000
    },
    {
      levelId: 1,
      levelName: 'Medium 😧',
      minVisibility: 750,
      maxVisibility: 1250,
      minDelay: 750,
      maxDelay: 1500
    },
    {
      levelId: 2,
      levelName: 'Hard 🤯',
      minVisibility: 500,
      maxVisibility: 1000,
      minDelay: 500,
      maxDelay: 1000
    }
  ]

  // The time limit on the clock.
  export const TIME_LIMIT: number = 30;

  // Types of characters that appear in the game.
  // Define probability ranges:
  // -- 82% chance of getting regular mole (+1 points when clicked)
  // -- 13% chance of getting mega mole (+2 points when clicked)
  // -- 5% chance of getting super mole (+3 point when clicked)
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