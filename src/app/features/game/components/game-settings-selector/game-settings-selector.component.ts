import { Component, Input } from '@angular/core';
import { GameState } from '@features/game/game.interfaces';
import { GameService } from '@features/game/services/game.service';
import { map, Observable } from 'rxjs';
import { GameSettingsSelectorItem } from './game-settings-selector.interface';
import { GAME } from '@features/game/game.constants';

@Component({
  selector: 'app-game-settings-selector',
  templateUrl: './game-settings-selector.component.html',
  styleUrl: './game-settings-selector.component.scss',
})
export class GameSettingsSelectorComponent {
  options: GameSettingsSelectorItem[] = [];
  state: Observable<GameState>
  _state: GameState = GAME.DEFAULT_STATE;
  activeIndex: number = 0;

  @Input() class: string = '';

  constructor(
    private gameSrv: GameService
  ) {
    // We need to know if the game is in progress. So we can disable the buttons
    // This is to prevent the user from changing the difficulty settings while
    // the game is currently in progress.
    this.state = this.gameSrv.getCurrentState().pipe(map(state => {
      console.log('Update: ', state)
      this.options = GAME.SETTINGS.map(opt => ({
        label: opt.levelName,
        levelId: opt.levelId,
        active: (state.levelId === opt.levelId)
      }))
      this._state = state;
      return state;
    }));

  }


  /**
   * Update the difficulty of the game. It will change the selected settings
   * stored in state. So the other components and services can have access to
   * what the user has chosen.
   * @memberof GameSettingsSelectorComponent
   */
  setDifficulty(levelId: number): void {
    this.gameSrv.setCurrentState({ ...this._state, levelId });
  }
}
