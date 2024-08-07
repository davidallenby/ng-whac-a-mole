import { Component } from '@angular/core';
import { GameService } from '@features/game/services/game.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss'
})
export class GameBoardComponent {
  moles: number[] = this.setMoleCount(9)
  showStartBtn: Observable<boolean> | undefined;
  inProgress: boolean = false;
  constructor(
    private gameSrv: GameService
  ) {
  }

  ngOnInit(){
    this.gameSrv.resetState(); // Reset the default state when the board laods
    this.showStartBtn = this.gameSrv.getCurrentState().pipe(map(state => {
      this.inProgress = state.inProgress
      // Only show the start button if the game is NOT in progress
      return !state.inProgress;
    }))
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

  // playSwoosh(): void {
  //   if (!this.inProgress) { return; }
  //   const audio = new Audio('sound/swoosh.mp3')
  //   audio.load();
  //   audio.play();
  // }
}
