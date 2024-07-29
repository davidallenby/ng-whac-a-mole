import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { RouterModule } from '@angular/router';
import { GameHeaderComponent } from "./components/game-header/game-header.component";
import { GameSettingsSelectorComponent } from './components/game-settings-selector/game-settings-selector.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { MoleComponent } from './components/mole/mole.component';

const gameRoutes = [
  {
    path: '',
    component: GameComponent
  }
]

@NgModule({
  declarations: [
    GameComponent,
    GameHeaderComponent,
    GameSettingsSelectorComponent,
    GameBoardComponent,
    MoleComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(gameRoutes)
],
  exports: [RouterModule]
})
export class GameModule { }
