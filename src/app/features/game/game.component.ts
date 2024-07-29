import { Component } from '@angular/core';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

  constructor(
    private gameSrv: GameService
  ) {}
  
  ngOnDestroy(): void {
    // When the user navigates away from the game screen, we'll want to reset
    // the state in the GameService. So the game is ready to play the next time
    // they come back to this screen
    this.gameSrv.resetState();
  }
}
