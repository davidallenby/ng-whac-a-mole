import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { Route, RouterModule } from '@angular/router';
import { GameHeaderComponent } from "./components/game-header/game-header.component";
import { GameSettingsSelectorComponent } from './components/game-settings-selector/game-settings-selector.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { MoleComponent } from './components/mole/mole.component';
import { GameService } from './services/game.service';
import { GameOverComponent } from './components/game-over/game-over.component';
import { GameScreenLayoutComponent } from './components/game-screen-layout/game-screen-layout.component';
import { GameOverGuard } from './guards/game-over.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const gameRoutes:Route[] = [
  {
    path: '',
    component: GameComponent,
    children: [
      // This is the layout for the actual game screen. We only want to show the
      // board and the settings selector when the user is going to play the game
      {
        path: '',
        component: GameScreenLayoutComponent
      },
      // The game over screen will only be accessible when the user has played.
      // If someone tries to access this screen without having first played a
      // game. They will be redirected back to the game screen.
      {
        path: 'game-over',
        component: GameOverComponent,
        canActivate: [GameOverGuard]
      }
    ]
  }
]

@NgModule({
  declarations: [
    GameComponent,
    GameHeaderComponent,
    GameSettingsSelectorComponent,
    GameBoardComponent,
    MoleComponent,
    GameScreenLayoutComponent,
    GameOverComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(gameRoutes),
    ReactiveFormsModule
  ],
  providers: [
    GameService,
    GameOverGuard
  ],
  exports: [RouterModule]
})
export class GameModule { }
