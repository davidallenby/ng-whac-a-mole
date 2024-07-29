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
    this.gameSrv.resetState();
  }
}
