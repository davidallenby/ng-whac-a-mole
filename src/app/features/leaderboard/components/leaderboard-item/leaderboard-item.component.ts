import { DatePipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LeaderboardPositionComponent } from '../leaderboard-position/leaderboard-position.component';
import { ScoreCircleComponent } from '@shared/components/score-circle/score-circle.component';
import { LeaderboardDataItem } from '@shared/interfaces/leaderboard.interfaces';

@Component({
  selector: 'app-leaderboard-item',
  standalone: true,
  imports: [
    NgClass,
    LeaderboardPositionComponent,
    DatePipe,
    ScoreCircleComponent
  ],
  templateUrl: './leaderboard-item.component.html',
  styleUrl: './leaderboard-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeaderboardItemComponent {
  @Input() index: number = 0;
  @Input() item: LeaderboardDataItem = {
    dateCreated: new Date().toISOString(),
    levelId: 0,
    playerName: '',
    score: 0
  };
}
