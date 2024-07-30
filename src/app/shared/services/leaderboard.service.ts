import { Injectable } from '@angular/core';
import { LeaderboardDataItem } from '@shared/interfaces/leaderboard.interfaces';
import { map, Observable } from 'rxjs';
import { CommonService } from './common.service';

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

  constructor(
    private commonSrv: CommonService
  ) { }

  getAllScores(): Observable<LeaderboardDataItem[]> {
    return new Observable<LeaderboardDataItem[]>((subject) => {
      try {
        const store = localStorage.getItem('ngWhacAMole');
        console.log(store)
        const allScores = !!store ? JSON.parse(store) : [];
        subject.next(allScores as LeaderboardDataItem[]);
        subject.complete();
      } catch (error) {
        console.error('Error fetching scores from localStorage:', error);
        subject.error(error); // Notify observers about the error
      }
    });
  }

  getHighScore(): Observable<number> {
    return this.getAllScores().pipe(map(data => {
      if (!data.length) { return 0; }
      const sorted = data.sort(this.commonSrv.objectSort('score'))
      return sorted[0].score
    }));
  }

  setNewScore(payload: LeaderboardDataItem): Observable<LeaderboardDataItem> {
    return this.getAllScores().pipe(map(data => {
      const copy = [...data].concat([payload])
      localStorage.setItem('ngWhacAMole', JSON.stringify(copy));
      return payload;  
    }))
  }
}
  