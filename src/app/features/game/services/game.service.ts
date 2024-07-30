import { afterNextRender, Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { GameDifficulty, GameState } from '../game.interfaces'
import { GAME } from '../game.constants'
import { CommonService } from '@shared/services/common.service'
import { GameModule } from '../game.module'
import { Router } from '@angular/router'
import { LeaderboardService } from '@shared/services/leaderboard.service'

@Injectable({
  providedIn: GameModule
})
export class GameService {
  gameOver: boolean = true;

  private timer: ReturnType<typeof setInterval> | undefined
  private timeLeft: BehaviorSubject<number> = new BehaviorSubject(
    GAME.TIME_LIMIT
  )

  private activeMole: BehaviorSubject<number> = new BehaviorSubject(0);

  private gameState: BehaviorSubject<GameState> =
    new BehaviorSubject(GAME.DEFAULT_STATE)

  constructor(
    private commonSrv: CommonService,
    private leaderSrv: LeaderboardService,
    private router: Router
  ) {
    // Get the current high score and set it in state.
    this.fetchAndSetHighScoreInState();
  }

  private fetchAndSetHighScoreInState(): void {
    afterNextRender(() => {
      this.leaderSrv.getHighScore().subscribe(hs => {
        const current = this.gameState.getValue();
        this.setCurrentState({
          ...current,
          highScore: hs
        })
      })
    })
  }

  /**
   * Get the remaining time
   *
   * @return {*}  {Observable<number>}
   * @memberof GameService
   */
  getTime (): Observable<number> {
    return this.timeLeft.asObservable()
  }

  /**
   * Update the timer
   *
   * @param {number} num
   * @memberof GameService
   */
  setTime (num: number): void {
    this.timeLeft.next(num)
  }

  /**
   * Function that starts the timer, and notifies the other components to start
   * animating
   *
   * @memberof GameService
   */
  startGame (): void {
    clearInterval(this.timer)
    const state = this.gameState.getValue();
    this.setCurrentState({
      ...state,
      // Reset the score to 0
      currentScore: 0,
      // Tell the game that the timer has started
      inProgress: true
    })
    // Reset the timer to 30 seconds
    let count = GAME.TIME_LIMIT
    this.setTime(count)
    const i = this.getRandomMoleIndex();
    this.setActiveMoleIndex(i);

    // Start the timer
    this.timer = setInterval(() => {
      // Reduce the time left
      count--
      // Update the observable that's listening
      this.setTime(count)
      // If the count is 0, stop the game
      if (count <= 0) {
        this.endGame();
      }
    }, 1000)
  }

  /**
   * Get a random mole index. Determines which mole pops up.
   *
   * @return {*}  {number}
   * @memberof GameService
   */
  getRandomMoleIndex(): number {
    const decimal = +(this.getRandomIntegerInRange(0, 8).toFixed(1));
    return Math.floor(decimal);
  }

  /**
   * Fired when the time limit runs out.
   *
   * @private
   * @memberof GameService
   */
  private endGame(): void {
    clearInterval(this.timer)
    const state = this.gameState.getValue();
    this.setCurrentState({ ...state, inProgress: false })
    this.gameOver = true;
    this.router.navigate(['/game/game-over'])
  }

  /**
   * Resets the game state back to the default. Fired when the user navigates
   * away from the game screen, or when they choose to reset the game.
   *
   * @memberof GameService
   */
  resetState(): void {
    const current = this.gameState.getValue();
    this.setCurrentState({
      ...current,
      currentScore: 0,
      inProgress: false
    })
    
    this.setTime(GAME.TIME_LIMIT);
    clearInterval(this.timer)
    this.gameOver = false;
  }

  getActiveMoleIndex(): Observable<number> {
    return this.activeMole.asObservable();
  }

  setActiveMoleIndex(index: number): void {
    this.activeMole.next(index)
  }

  /**
   * This function gets a random visibility integer value. This will be for how
   * long the mole appears vibile for.
   *
   * @return {*}  {number}
   * @memberof GameService
   */
  getRandomVisibility(): number {
    // get the current state
    const state = this.gameState.getValue();
    // We need to fetch the visibility settings from the settings object. Fall
    // back to easy mode if not found.
    const found = GAME.SETTINGS.find(item => item.levelId === state.levelId) ??
    GAME.SETTINGS[0];
    // Set the min/max visibility for a mole
    const max = found.maxVisibility;
    const min = found.minVisibility;
    // Get a random number and return
    const value = this.getRandomIntegerInRange(min, max);
    return Math.round(value)
  }

  private getRandomIntegerInRange(min: number, max: number): number {
    return (Math.random() * (max - min) + min * 1);
  }

  /**
   * Generates a character type ID based on the probability set in the
   * character settings
   *
   * @return {*}  {number}
   * @memberof GameService
   */
  getNewMoleTypeId(): number {
    // Create a copy of the character list
    const types = [...GAME.MOLE_TYPES]
    // Sort the list of characters by probability (ascending order)
    .sort(this.commonSrv.objectSort('moleProbability', true))
    // Generate a random number
    const randomNum = +(Math.random().toFixed(2));
    // Initiate the range minimum as 0...
    let rangeMin = 0;
    // Begin iterating over the mole types and find which range the random
    // number exists between.
    for (const moleType of types) {
      // If the random number falls between this iteration's range, return the
      // type ID for that mole character
      if (randomNum >= rangeMin && randomNum <= moleType.moleProbability) {
        return moleType.moleTypeId;
      }
      // If the number does NOT fall within the probability range for this
      // character. We loop over again.
      // This line will add the current value of rangeMin to the 
      // mmoleType.moleProbability value, and assign it to rangeMin
      rangeMin += moleType.moleProbability;
    }
    // By default, we'll return a regular mole.
    return 1; 
  }

  getCurrentState(): Observable<GameState> {
    return this.gameState.asObservable();    
  }

  setCurrentState(state: GameState): void {
    this.gameState.next(state);
  }
}
