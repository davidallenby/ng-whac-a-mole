import { Injectable } from '@angular/core';
import { LeaderboardDataItem } from '@shared/interfaces/leaderboard.interfaces';
import { map, Observable, switchMap, take } from 'rxjs';
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
        const allScores:LeaderboardDataItem[]= !!store ? JSON.parse(store) : []
        const sorted = allScores.sort(this.commonSrv.objectSort('score'))
        console.log('Record count on load: ', sorted.length)
        subject.next(sorted);
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
      return data[0].score
    }));
  }

  /**
   * This function will attempt to set a new high score. If the score isn't
   * one of the top 10 results it will trash it and return the high score.
   * This is because we need to update the state with the latest high score on
   * save success
   *
   * @param {LeaderboardDataItem} payload
   * @return {*}  {Observable<LeaderboardDataItem>}
   * @memberof LeaderboardService
   */
  setNewScore(payload: LeaderboardDataItem): Observable<number> {
    return this.getAllScores().pipe(switchMap(data => {
      // Get a copy of the existing high scores, and add this score to the list
      const copy = [...data].concat([payload])
      // sort the list in descending order
      .sort(this.commonSrv.objectSort('score'))
      // Trim the array to only retain the top 10 scores
      copy.slice(0, 9);
      // Store it to the 
      console.log('Saving item: ', copy)
      localStorage.setItem('ngWhacAMole', JSON.stringify(copy));
      return this.getHighScore();  
    }))
  }
}
  