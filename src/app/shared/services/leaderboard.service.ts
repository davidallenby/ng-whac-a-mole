import { Injectable } from '@angular/core';
import { LeaderboardDataItem, LeaderboardScoreGroup } from '@shared/interfaces/leaderboard.interfaces';
import { map, Observable, switchMap } from 'rxjs';
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

  /**
   * We need a list of all the scores that have been stored so we can present
   * them as a list in the leaderboard screen.
   *
   * @return {*}  {Observable<LeaderboardDataItem[]>}
   * @memberof LeaderboardService
   */
  getAllScores(): Observable<LeaderboardDataItem[]> {
    return new Observable<LeaderboardDataItem[]>((subject) => {
      try {
        const store = localStorage.getItem('ngWhacAMole');
        const allScores:LeaderboardDataItem[] = !!store ? JSON.parse(store) : []
        const sorted = allScores.sort(this.commonSrv.objectSort('score'))
        subject.next(sorted);
        subject.complete();
      } catch (error) {
        console.error('Error fetching scores from localStorage:', error);
        subject.error(error); // Notify observers about the error
      }
    });
  }

  /**
   * We need the high score so the user knows what their target is to beat.
   *
   * @return {*}  {Observable<number>}
   * @memberof LeaderboardService
   */
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
      // Add the new score to the list of data
      const newData = this.addNewScoreToLeaderboardData(payload, data)
      // Stringify the new data and add to local storage
      localStorage.setItem('ngWhacAMole', JSON.stringify(newData));
      return this.getHighScore();  
    }))
  }

  /**
   * This functon takes the existing scores, checks if the new score is going to
   * make the top 10 for that level ID. If not, it discards the new score. If it
   * does make the top 10, it adds to the top 10 and removes any scores that sit
   * outside the top 10.
   *
   * @private
   * @param {LeaderboardDataItem} newItem
   * @param {LeaderboardDataItem[]} data
   * @return {*}  {LeaderboardDataItem[]}
   * @memberof LeaderboardService
   */
  private addNewScoreToLeaderboardData(
    newItem: LeaderboardDataItem, data: LeaderboardDataItem[]
  ): LeaderboardDataItem[] {
    // Group the scores by level ID
    const grouped = this.getScoresGrouped(data);
    // If a group doesn't exist for the new item's level ID, create one.
    if (!grouped[newItem.levelId]) {
      grouped[newItem.levelId] = [newItem];
    } else {
      // If a group does exist for the new item's level ID...
      let levelScores = grouped[newItem.levelId];
      // If there are less than 10 scores just add the new item to the array of
      // scores.
      if (levelScores.length < 10) {
        levelScores.push(newItem)
      } else { // If there are 10 or more, we need to trim the fat...
        // Sort the current scores ascending (lowest -> highest)
        levelScores.sort(this.commonSrv.objectSort('score', true));
        if (newItem.score >= levelScores[0].score) {
          levelScores.unshift();
          levelScores.push(newItem);
        }
      }
    }
    return this.setScoreGroupsAsFlatList(grouped);
  }

  /**
   * This helper function converts the grouped leaderboard scores back into a
   * flat list of storage in the data base
   *
   * @private
   * @param {LeaderboardScoreGroup} groups
   * @return {*}  {LeaderboardDataItem[]}
   * @memberof LeaderboardService
   */
  private setScoreGroupsAsFlatList(groups: LeaderboardScoreGroup)
  : LeaderboardDataItem[] {
    let result: LeaderboardDataItem[] = [];
    for (const key in groups) {
      if (groups.hasOwnProperty(key)) {
        result = result.concat(groups[key])
      }
    }
    // Return the scores sorted by highest score first
    return result.sort(this.commonSrv.objectSort('score'))
  }

  /**
   * Group the array of scores by level ID in an object key value (array).
   * This helper function will assist us in adding new scores to the list of
   * scores for each level
   *
   * @private
   * @param {LeaderboardDataItem[]} scores
   * @return {*}  {LeaderboardScoreGroup}
   * @memberof LeaderboardService
   */
  private getScoresGrouped(scores: LeaderboardDataItem[])
  : LeaderboardScoreGroup {

    const groups: { [levelId: number]: LeaderboardDataItem[] } = {};
    // Group the scores by level ID
    scores.forEach((score) => {
      if (!groups[score.levelId]) {
        groups[score.levelId] = []
      }
      groups[score.levelId].push(score)
    })
    return groups;
  }
}
  