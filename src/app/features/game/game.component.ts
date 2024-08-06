import { Component, inject } from '@angular/core';
import { GameService } from './services/game.service';
import { ActivatedRoute } from '@angular/router';
import { GAME } from '@shared/constants/game.constants';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  constructor(
    private gameSrv: GameService
  ) {
    // Get the level ID from params
    const levelId = this.getLevelIdFromParams();
    // Check if the route has a level ID query parameter
    if (isNaN(levelId)) { return; }
    // If the route params includes level ID, make sure the level ID exists
    const levelExists = GAME.LEVELS.find(level => level.levelId === levelId);
    // If the level ID doesn't exist, abort.
    if (!levelExists) { return; }
    // If it does, get the current state...
    const state = this.gameSrv.stateValue;
    // Set the selected level ID in state
    this.gameSrv.setCurrentState({ ...state, levelId })
  }

  // Need to retrieve the level ID from the route params (to pass to state)
  private getLevelIdFromParams(): number {
    const params = this.activatedRoute.snapshot.queryParams;
    const levelId = params['levelId'];
    return +levelId;
  }
  
  ngOnDestroy(): void {
    // When the user navigates away from the game screen, we'll want to reset
    // the state in the GameService. So the game is ready to play the next time
    // they come back to this screen
    this.gameSrv.resetState();
  }
}
