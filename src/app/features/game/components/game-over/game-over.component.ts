import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from '@features/game/services/game.service';
import { LeaderboardService } from '@shared/services/leaderboard.service';
import { validatePlayerNameField } from './game-over.validators';
import { map, Observable, take } from 'rxjs';
import { GAME } from '@shared/constants/game.constants';
import { GameState } from '@shared/interfaces/game.interfaces';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrl: './game-over.component.scss',
})
export class GameOverComponent {
  // Form group for entering player name
  form: FormGroup = new FormGroup({
    // This form field is optional, but if the user DOES enter a value, it needs
    // to be 3 characters. That's where a custom validator comes in handy.
    name: new FormControl('', [validatePlayerNameField()])
  })
  // Form input field - "name"
  get name(): AbstractControl|null {
    return this.form.get('name');
  }

  state: Observable<GameState>|undefined;
  _state: GameState = GAME.DEFAULT_STATE;
  isHighest: boolean = false;

  highScore: number = 0;

  constructor(
    private gameSrv: GameService,
    private leaderSrv: LeaderboardService,
    private router: Router
  ) {
    // Get signal value
    this.highScore = this.gameSrv.highScore;
  }

  ngOnInit() {
    this.state = this.gameSrv.getCurrentState().pipe(map(data => {
      this._state = data;
      this.isHighest = (data.currentScore > this.gameSrv.highScore)
      return data;
    }));
  }

  ngOnDestroy() {
    this.gameSrv.resetState();
  }


  /**
   * The logic is almost identical when the buttons are clicked on the game over
   * screen. The only difference is "try again" will update the high scre state
   *
   * @param {string} redirectUrl
   * @param {boolean} [updateState=false]
   * @return {*}  {void}
   * @memberof GameOverComponent
   */
  buttonClickHandler(redirectUrl: string): void {
    // If the form is invalid, do nothing.
    if (this.form.invalid) { return; }
    // If the user has entered a name, save the score record before navigating
    if (this.isNameEntered()) {
      // Run the save score function. "saveScore" will only run this code once
      this.saveScore().subscribe();
      // If the user clicks "try again", we'll need to update the state in the
      // game service. As we'll be redirecting back to the game screen
      this.updateHighScoreState()
    }
    // Navigate to the "game" screen
    this.router.navigate([redirectUrl])
  }

  /**
   * We need to check if the name has been entered. If it has, we'll save the
   * score. If not, we ignore and continue.
   *
   * @private
   * @return {*}  {boolean}
   * @memberof GameOverComponent
   */
  private isNameEntered(): boolean {
    const { name } = this.form.value;
    return !!name;
  }

  /**
   * If the current user score is not greater than the high score in state. Then
   * we do not need to update the highscore in state.
   *
   * @private
   * @return {*}  {void}
   * @memberof GameOverComponent
   */
  private updateHighScoreState(): void {
    // Update the high score if required
    const { currentScore } = this._state;
    if (this.isHighest) { return; }
    // Update the current state.
    this.gameSrv.highScoreSignal.set(currentScore)
  }

  /**
   * Saves the user's score to the leaderboard so we can build the leaderboard
   *
   * @private
   * @memberof GameOverComponent
   */
  private saveScore(): Observable<number> {
    // Deconstruct the name from the form value
    const { name } = this.form.value;
    // Set the new score in local storage
    return this.leaderSrv.setNewScore({
      dateCreated: new Date().toISOString(),
      score: this._state.currentScore,
      levelId: this._state.levelId,
      playerName: name.toUpperCase()
      // take(1) will only subscribe to this function once. So that when we
      // navigate away from the screen it continues running the functio.
    }).pipe(take(1))
  }
}
