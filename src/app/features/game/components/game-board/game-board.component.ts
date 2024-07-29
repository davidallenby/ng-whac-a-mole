import { Component } from '@angular/core';
import { GameSettings } from '@features/game/game.interfaces';
import { GameService } from '@features/game/services/game.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss'
})
export class GameBoardComponent {
  settings: Observable<GameSettings>;
  moles: number[] = this.setMoleCount(9)
  inProgress: Observable<boolean>;

  constructor(
    private gameSrv: GameService
  ) {
    this.settings = this.gameSrv.getDifficulty();

    this.inProgress = this.gameSrv.getInProgress()
  }

  /**
   * Depending on the difficulty, we'll need more/less mole holes on the board.
   * This function generates an array that the template iterates over and will
   * create a separate mole component for each one.
   *
   * @private
   * @param {number} limit
   * @memberof GameBoardComponent
   */
  private setMoleCount(limit: number) {
    const arr = [];
    for (let i = 0; i < limit; i++) {
      arr.push(i);
    } 
    return arr;
  }

  /**
   * When the user clicks the start button it will run this function and fire
   * the logic contained within the service
   *
   * @memberof GameBoardComponent
   */
  startGame(): void {
    this.gameSrv.startGame();
  }
}
