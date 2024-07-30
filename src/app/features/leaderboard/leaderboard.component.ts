import { AsyncPipe, DatePipe, NgClass, NgIf } from '@angular/common';
import { afterNextRender, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ScoreCircleComponent } from '@shared/components/score-circle/score-circle.component';
import { LeaderboardDataItem } from '@shared/interfaces/leaderboard.interfaces';
import { LeaderboardService } from '@shared/services/leaderboard.service';
import { Observable } from 'rxjs';
import { LeaderboardPositionComponent } from "./components/leaderboard-position/leaderboard-position.component";
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-leaderboard',
  // This is a standalone component. It does not have a module.
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    ScoreCircleComponent,
    DatePipe,
    NgClass,
    RouterLink,
    LeaderboardPositionComponent
],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeaderboardComponent {

  scores: Observable<LeaderboardDataItem[]> | undefined;

  constructor(
    private leaderSrv: LeaderboardService,
    private cdr: ChangeDetectorRef
  ) {
    // After next render will wait until the DOM loads. Can't access
    // storage from within Angular SSR.
    // TODO: Investigate afterNextRender
    afterNextRender(() => {
      this.scores = this.leaderSrv.getAllScores();
      this.cdr.detectChanges();
    })
  }


}
