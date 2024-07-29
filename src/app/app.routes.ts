import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  // Lazy-loaded standalone component! - We lazy load this component for
  // optimization. Rather than loading everything when the app first starts,
  // we'll only load it when it's requested.
  {
    path: 'leaderboard',
    loadComponent: () => import('@features/leaderboard/leaderboard.component')
    .then((m) => m.LeaderboardComponent)
  },
  // Lazy-loaded module - This is an example of how to structure feature modules
  // All the logic for the game is encapsulated within this feature module
  {
    path: 'game',
    loadChildren: () => import('@features/game/game.module').then((m) => {
      return m.GameModule;;
    })
  }
];
