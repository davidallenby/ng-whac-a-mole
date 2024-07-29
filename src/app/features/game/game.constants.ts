import { GameSettings } from "./game.interfaces";

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

  export const MAX_DELAY: number = 6000;
}