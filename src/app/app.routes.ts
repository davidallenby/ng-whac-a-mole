import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'leaderboard',
    loadComponent: () => import('@features/leaderboard/leaderboard.component')
    .then((m) => m.LeaderboardComponent)
  },
  {
    path: 'game',
    loadChildren: () => import('@features/game/game.module').then((m) => {
      return m.GameModule;;
    })
  }
];
