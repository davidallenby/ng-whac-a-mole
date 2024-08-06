import { afterNextRender, Injectable, signal } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { GAME } from '../../../shared/constants/game.constants'
import { CommonService } from '@shared/services/common.service'
import { GameModule } from '../game.module'
import { Router } from '@angular/router'
import { LeaderboardService } from '@shared/services/leaderboard.service'
import { GameLevel, GameState } from '@shared/interfaces/game.interfaces'
import { ActiveMoleConfig } from '../game.interfaces'

@Injectable({
  providedIn: GameModule
})
export class GameService {
  // Angular signal for the current game over state
  private _gameOver = signal(false);
  get gameOver() {
    return this._gameOver();
  }
  // Timer for the current game time
  private timer: ReturnType<typeof setInterval> | undefined
  private timeLeft: BehaviorSubject<number> = new BehaviorSubject(
    GAME.TIME_LIMIT
  )

  private gameState: BehaviorSubject<GameState> =
    new BehaviorSubject(GAME.DEFAULT_STATE)

  private activeMoleConfig: BehaviorSubject<ActiveMoleConfig> =
    new BehaviorSubject<ActiveMoleConfig>({
      id: 0,
      visibility: 0,
      typeId: 0
    });

  constructor(
    private commonSrv: CommonService,
    private leaderSrv: LeaderboardService,
    private router: Router
  ) {
    // Get the current high score and set it in state.
    this.fetchAndSetHighScoreInState();
  }

  /**
   * When this service is initialised we need to fetch the data from storage and
   * apply it to the current state. So that the components can access.
   *
   * @private
   * @memberof GameService
   */
  private fetchAndSetHighScoreInState(): void {
    afterNextRender(() => {
      this.leaderSrv.getHighScore().subscribe(hs => {
        const current = this.gameState.getValue();
        this.setCurrentState({ ...current, highScore: hs })
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
    // Generate and set new active mole config
    this.setNewActiveMoleConfig();
    // Start the timer
    this.timer = setInterval(() => {
      // Reduce the time left
      count--
      // Update the observable that's listening
      this.setTime(count)
      // If the count is 0, stop the game
      if (count <= 0) { this.endGame(); }
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
    // Unblock the game over screen from being visible
    this._gameOver.set(true);
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
    // Reset the clock to the time limit
    this.setTime(GAME.TIME_LIMIT);
    clearInterval(this.timer)
    this._gameOver.set(false);
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
    const config = this.getCurrentLevelConfig();
    // Get a random number and return
    return this
    .getRandomIntegerInRange(config.minVisibility, config.maxVisibility)
  }

  /**
   * Based on the level difficulty - this function will generate a time in
   * miliseconds that will delay between hiding the last mole, and generating
   * the next one
   *
   * @return {*}  {number}
   * @memberof GameService
   */
  getRandomDelayValue(): number {
    const config = this.getCurrentLevelConfig();
    return this.getRandomIntegerInRange(config.minDelay, config.maxDelay)
  }

  /**
   * Required for generating active mole index, new mole type ID, and the length
   * of time the mole is active.
   *
   * @private
   * @param {number} min
   * @param {number} max
   * @return {*}  {number}
   * @memberof GameService
   */
  private getRandomIntegerInRange(min: number, max: number): number {
    return Math.round((Math.random() * (max - min) + min * 1));
  }

  /**
   * When a new mole is ready to appear, we want to provide it with a random
   * type ID. So that it can increase/decrease the amount of points the user
   * gets for clicking it successfully.
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

  getActiveMoleConfig(): Observable<ActiveMoleConfig> {
    return this.activeMoleConfig.asObservable();
  }

  /**
   * Generates, and sets a new configuration for the next active mole.
   *
   * @memberof GameService
   */
  setNewActiveMoleConfig(): void {
    const newConfig = this.generateNewActiveMoleConfig();
    // Random delay value will create delay between showing the next mole
    setTimeout(() => this.activeMoleConfig.next(newConfig), 
    this.getRandomDelayValue())
    
  }

  private generateNewActiveMoleConfig(): ActiveMoleConfig {
    return {
      id: this.getRandomMoleIndex(),
      typeId: this.getNewMoleTypeId(),
      visibility: this.getRandomVisibility()
    }
  }
  /**
   * Based on the level ID stored in state, return the full configuration object
   *
   * @private
   * @return {*}  {GameLevel}
   * @memberof GameService
   */
  private getCurrentLevelConfig(): GameLevel {
    const { levelId } = this.gameState.getValue();
    return GAME.LEVELS[levelId];
  }
}
