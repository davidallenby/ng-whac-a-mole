export interface LeaderboardDataItem {
  playerName: string;
  levelId: number;
  score: number;
  dateCreated: string;
}

export interface LeaderboardScoreGroup {
  [levelId: number]: LeaderboardDataItem[]
}