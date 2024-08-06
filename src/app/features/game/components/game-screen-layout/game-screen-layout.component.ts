import { Component } from '@angular/core';
import { GameService } from '@features/game/services/game.service';
import { GAME } from '@shared/constants/game.constants';
import { GameState } from '@shared/interfaces/game.interfaces';
import { LeaderboardService } from '@shared/services/leaderboard.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-game-screen-layout',
  templateUrl: './game-screen-layout.component.html',
  styleUrl: './game-screen-layout.component.scss'
})
export class GameScreenLayoutComponent {
  
  state: Observable<GameState>|undefined;
  _state: GameState = GAME.DEFAULT_STATE;

  constructor(
    private gameSrv: GameService,
    private leaderSrv: LeaderboardService
  ) {}

  ngOnInit() {
    this.state = this.gameSrv.getCurrentState().pipe(map((state) => {
      this._state = state;
      return state
    }));
  }

  setDifficultyInState(levelId: number): void {
     
    const obs = this.leaderSrv.getHighScore(levelId)
    .pipe(map((hs: number, i: number) => {
      // Update the high score signal
      this.gameSrv.highScoreSignal.set(hs)
      // Update the current state
      this.gameSrv.setCurrentState({ ...this._state, levelId })
      return;
    })).subscribe();

    obs.unsubscribe();
  }
}
