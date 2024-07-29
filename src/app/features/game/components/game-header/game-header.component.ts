import { Component } from '@angular/core';
import { GameService } from '@features/game/services/game.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game-header',
  templateUrl: './game-header.component.html',
  styleUrl: './game-header.component.scss'
})
export class GameHeaderComponent {

  score: Observable<number>;
  highScore: Observable<number>;
  time: Observable<number>;

  constructor(
    private gameSrv: GameService
  ) {
    this.score = this.gameSrv.getScore();
    this.highScore = this.gameSrv.getHighScore();
    this.time = this.gameSrv.getTime();
  }
}
