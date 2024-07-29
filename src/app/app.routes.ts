import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'leaderboard',
    loadChildren: () => import('@features/game/game.module').then((m) => {
      return m.GameModule;;
    })
  },
  {
    path: 'game',
    loadChildren: () => import('@features/game/game.module').then((m) => {
      return m.GameModule;;
    })
  }
];
