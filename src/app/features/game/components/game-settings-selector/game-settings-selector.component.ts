import { Component, Input } from '@angular/core';
import { GAME } from '@features/game/game.constants';
import { GameSettings } from '@features/game/game.interfaces';
import { GameService } from '@features/game/services/game.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-game-settings-selector',
  templateUrl: './game-settings-selector.component.html',
  styleUrl: './game-settings-selector.component.scss'
})
export class GameSettingsSelectorComponent {
  settings: GameSettings[] = [...GAME.SETTINGS];
  inProgress: Observable<boolean>;
  activeIndex: Observable<number>;

  @Input() class: string = '';

  constructor(
    private gameSrv: GameService
  ) {
    // Get the current active index for the difficulty setting
    this.activeIndex = this.gameSrv.getDifficulty()
    .pipe(map(res => res.levelId))
    // We need to know if the game is in progress. So we can disable the buttons
    // This is to prevent the user from changing the difficulty settings while
    // the game is currently in progress.
    this.inProgress = this.gameSrv.getInProgress();
  }

  /**
   * Update the difficulty of the game. It will change the selected settings
   * stored in state. So the other components and services can have access to
   * what the user has chosen.
   *
   * @param {GameSettings} settings
   * @memberof GameSettingsSelectorComponent
   */
  setDifficulty(settings: GameSettings): void {
    this.gameSrv.setDifficulty(settings);
  }
}
