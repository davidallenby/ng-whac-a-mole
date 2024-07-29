import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { GameSettings } from '../game.interfaces'
import { GAME } from '../game.constants'

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private score: BehaviorSubject<number> = new BehaviorSubject(0)
  private highScore: BehaviorSubject<number> = new BehaviorSubject(0)

  private inProgress: BehaviorSubject<boolean> = new BehaviorSubject(false)

  private timer: ReturnType<typeof setInterval> | undefined
  private timeLeft: BehaviorSubject<number> = new BehaviorSubject(
    GAME.TIME_LIMIT
  )

  private difficulty: BehaviorSubject<GameSettings> =
    // Easy mode is the default setting
    new BehaviorSubject({ ...GAME.SETTINGS[0] })

  private activeMole: BehaviorSubject<number> = new BehaviorSubject(0);

  /**
   * Get the current score from state
   *
   * @return {*}  {Observable<number>}
   * @memberof GameService
   */
  getScore (): Observable<number> {
    return this.score.asObservable()
  }

  getScoreValue(): number {
    return this.score.getValue();
  }

  /**
   * Set the current score in state
   *
   * @param {number} num
   * @memberof GameService
   */
  setScore (num: number): void {
    this.score.next(num)
  }

  /**
   * Get the current high score from the leaderboard
   *
   * @return {*}  {Observable<number>}
   * @memberof GameService
   */
  getHighScore (): Observable<number> {
    return this.highScore.asObservable()
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
   * Get the user's selected settings.
   *
   * @return {*}  {Observable<GameSettings>}
   * @memberof GameService
   */
  getDifficulty(): Observable<GameSettings> {
    return this.difficulty.asObservable();
  }
  /**
   * Set the difficult of the game. We'll use this to create more squares, and
   * increase the speed of the game
   *
   * @param {GameSettings} settings
   * @memberof GameService
   */
  setDifficulty(settings: GameSettings): void {
    this.difficulty.next(settings)
  }

  /**
   * Whether or not the game has started.
   *
   * @return {*}  {Observable<boolean>}
   * @memberof GameService
   */
  getInProgress(): Observable<boolean> {
    return this.inProgress.asObservable();
  }

  /**
   * Tell the game whether or not it's in progress
   *
   * @param {boolean} bool
   * @memberof GameService
   */
  setInProgress(bool: boolean): void {
    this.inProgress.next(bool);
  }

  /**
   * Function that starts the timer, and notifies the other components to start
   * animating
   *
   * @memberof GameService
   */
  startGame (): void {
    clearInterval(this.timer)
    // Reset the score to 0
    this.setScore(0)
    // Tell the game that the timer has started
    this.setInProgress(true);
    // Reset the timer to 30 seconds
    let count = GAME.TIME_LIMIT
    this.setTime(count)

    const i = this.getRandomMoleIndex();
    this.setActiveMole(i);

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
    this.setInProgress(false);
    alert('GAME OVER!')
  }

  /**
   * Resets the game state back to the default. Fired when the user navigates
   * away from the game screen, or when they choose to reset the game.
   *
   * @memberof GameService
   */
  resetState(): void {
    this.setScore(0);
    this.setInProgress(false);
    this.setTime(GAME.TIME_LIMIT);
    clearInterval(this.timer)
  }

  getActiveMole(): Observable<number> {
    return this.activeMole.asObservable();
  }

  setActiveMole(index: number): void {
    this.activeMole.next(index)
  }

  getRandomVisibility(): number {
    const settings = this.difficulty.getValue();
    const max = settings.maxVisibility;
    const min = settings.minVisibility;
    const value = this.getRandomIntegerInRange(min, max);
    return Math.round(value)
  }

  private getRandomIntegerInRange(min: number, max: number): number {
    return (Math.random() * (max - min) + min * 1);
  }
}
