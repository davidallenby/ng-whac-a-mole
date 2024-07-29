import { GameSettings, MoleType } from "./game.interfaces";

export namespace GAME {
  export const SETTINGS: GameSettings[] = [
    {
      levelId: 0,
      levelName: 'Easy 😎',
      
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
  ]
}