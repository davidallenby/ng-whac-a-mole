import { Injectable } from '@angular/core';
import { LeaderboardDataItem } from '@shared/interfaces/leaderboard.interfaces';
import { Observable } from 'rxjs';

/**
 * The leaderboard service is stored in shared services as it will be used
 * across multiple features throughout the app.
 *
 * @export
 * @class LeaderboardService
 */
@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {

  constructor() { }

  getAllScores(): Observable<LeaderboardDataItem>|null {
    return null;
  }
}
  