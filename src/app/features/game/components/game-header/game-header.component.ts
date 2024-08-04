import { Component } from '@angular/core';
import { GameService } from '@features/game/services/game.service';
import { GameState } from '@shared/interfaces/game.interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game-header',
  templateUrl: './game-header.component.html',
  styleUrl: './game-header.component.scss'
})
export class GameHeaderComponent {
  time: Observable<number>|undefined;
  state: Observable<GameState>|undefined;

  constructor(
    private gameSrv: GameService,
  ) {
    
  }

  ngOnInit() {
    this.time = this.gameSrv.getTime();
    this.state = this.gameSrv.getCurrentState();
  }
}
