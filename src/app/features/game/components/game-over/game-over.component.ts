import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from '@features/game/services/game.service';
import { LeaderboardService } from '@shared/services/leaderboard.service';
import { validatePlayerNameField } from './game-over.validators';
import { map, Observable } from 'rxjs';
import { GameState } from '@features/game/game.interfaces';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrl: './game-over.component.scss'
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

  state: Observable<GameState>;

  isHighest: boolean = false;

  constructor(
    private gameSrv: GameService,
    private leaderSrv: LeaderboardService,
    private router: Router
  ) {
    this.state = this.gameSrv.getCurrentState().pipe(map(data => {
      console.log(data)
      return data;
    }));
  }

  /**
   * Handles the navigation/saving of data when the user clicks the try again
   * button. So that we can either save the score, or trash the score and allow
   * the user to try again
   *
   * @return {*}  {void}
   * @memberof GameOverComponent
   */
  tryAgainClick(): void {
    // If the form is invalid, do nothing.
    if (this.form.invalid) { return; }
    // Get the value the user has entered into the name field.
    const { name } = this.form.value;
    // If the user has entered a name, save the score record before navigating
    if (name) {

      return;
    }
    // Navigate to the "game" screen
    this.router.navigate(['/game'])
  }

}
