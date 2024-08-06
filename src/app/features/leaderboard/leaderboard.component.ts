import { AsyncPipe, DatePipe, NgClass, NgIf } from '@angular/common';
import { afterNextRender, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ScoreCircleComponent } from '@shared/components/score-circle/score-circle.component';
import { LeaderboardDataItem } from '@shared/interfaces/leaderboard.interfaces';
import { LeaderboardService } from '@shared/services/leaderboard.service';
import { Subscription } from 'rxjs';
import { LeaderboardPositionComponent } from "./components/leaderboard-position/leaderboard-position.component";
import { RouterLink } from '@angular/router';
import { LeaderboardItemComponent } from './components/leaderboard-item/leaderboard-item.component';
import { GameLevel } from '@shared/interfaces/game.interfaces';
import { GAME } from '@shared/constants/game.constants';
import { DifficultySelectComponent } from "../../shared/components/difficulty-select/difficulty-select.component";
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
    LeaderboardPositionComponent,
    LeaderboardItemComponent,
    DifficultySelectComponent
],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeaderboardComponent {
  scoreSub: Subscription|undefined;
  scores: LeaderboardDataItem[] = []
  filteredScores: LeaderboardDataItem[] = []
  levels: GameLevel[] = [...GAME.LEVELS];
  loading: boolean = true;
  activeFilterId: number = 0;

  constructor(
    private leaderSrv: LeaderboardService,
    private cdr: ChangeDetectorRef
  ) {
    // TODO: Figure out what "The Angular Way" is to handle local storage in SSR
    // After next render runs once, the next time that all components have been 
    // rendered to the DOM. We don't have access to local storage using SSR.
    // So we need to run this when localStorage becomes available.
    afterNextRender(() => {
      this.scoreSub = this.leaderSrv.getAllScores().subscribe(result => {
        this.scores = result;
        this.filteredScores = result
        .filter(score => score.levelId === this.activeFilterId);
        // Show the list
        this.loading = false;
        this.cdr.detectChanges();
      })
    })
  }
  /**
   * Filters the list of scores so we can filter by difficulty.
   *
   * @param {number} levelId
   * @memberof LeaderboardComponent
   */
  filterClickHandler(levelId: number): void {
    this.activeFilterId = levelId;
    this.filteredScores = this.scores.filter(score => score.levelId === levelId)
  }

  ngOnDestroy() {
    this.scoreSub?.unsubscribe();
  }
}
