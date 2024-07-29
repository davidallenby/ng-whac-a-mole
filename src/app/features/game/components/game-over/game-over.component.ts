import { Component } from '@angular/core';
import { GameService } from '@features/game/services/game.service';
import { LeaderboardService } from '@shared/services/leaderboard.service';

@Component({
  selector: 'app-game-over',
  standalone: true,
  imports: [],
  templateUrl: './game-over.component.html',
  styleUrl: './game-over.component.scss'
})
export class GameOverComponent {
  constructor(
    private gameSrv: GameService,
    private leaderSrv: LeaderboardService
  ) {}
}
