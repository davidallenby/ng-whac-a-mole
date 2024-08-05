import { Component, Input } from '@angular/core';
import { ActiveMoleConfig } from '@features/game/game.interfaces';
import { GameService } from '@features/game/services/game.service';
import { GAME } from '@shared/constants/game.constants';
import { GameState } from '@shared/interfaces/game.interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mole',
  templateUrl: './mole.component.html',
  styleUrl: './mole.component.scss'
})
export class MoleComponent {
  @Input()index: number = 0;
  show: boolean = false;
  // Mole attributes
  moleTypeId: number = 1;
  // Current state
  private _state: GameState = GAME.DEFAULT_STATE;
  // Active config
  private _config: ActiveMoleConfig|null = null

  subs: Subscription[] = []
  clicked: boolean = false;
  
  private visbilityTimer: ReturnType<typeof setInterval> | undefined

  constructor(
    private gameSrv: GameService
  ) {}

  ngOnInit() {
    // Get the current game state
    const state = this.gameSrv.getCurrentState().subscribe(state => {
      this._state = state;
      if (!state.inProgress) {
        clearTimeout(this.visbilityTimer);
        this.show = false;
      }
    });
    this.subs.push(state)

    // Subscribe to the active mole configuration changes
    const activeMole = this.gameSrv.getActiveMoleConfig().subscribe(config => {
      this._config = config;
      // Whether to show/hide this mole
      this.show = (this._state.inProgress && config.id === this.index)
      // If no config returns that means the game is not in progress
      // If we're not showing this mole, clear the timer
      if (!config || !this.show) {
        clearTimeout(this.visbilityTimer);
      } else {
        this.moleTypeId = config.typeId;
        this.initMoleLifespan(config);
      }
    })
    this.subs.push(activeMole);
  }

  /**
   * Unsubscribe from Observables when this component is destroyed. This will
   * enhance performance.
   *
   * @memberof MoleComponent
   */
  ngOnDestroy() {
    clearTimeout(this.visbilityTimer)
    this.subs.forEach(sub => sub.unsubscribe())
  }

  /**
   * When the user clicks the mole, we want to hide the current mole, update the
   * score, and generate the next active mole index.
   *
   * @return {*}  {void}
   * @memberof MoleComponent
   */
  onMoleClick(): void {
    // Prevent getting extra points for additional clicks or, if the user clicks 
    // this mole while it's hiding. Will prevent the new mole generation logic
    // from running again too.
    if (this.clicked || !this.show) { return; }
    // Set the mole guard to true
    this.clicked = true;
    // Prevent the auto-hide logic from running
    clearTimeout(this.visbilityTimer);
    // Hide the mole (since it was clicked)
    this.show = false;
    // Increment the score value by however many points this click is worth
    this.gameSrv.setCurrentState({ 
      ...this._state,
      currentScore: this.getUpdatedScore()
    });
    // Remove the click guard
    this.clicked = false;
    // Generate the next mole
    this.gameSrv.setNewActiveMoleConfig();
  }

  /**
   * This function generates the new value for display on the score board. 
   * We take the current score stored in state, and add however many points this
   * click is worth. Number of points is based on the type of mole.
   *
   * @private
   * @return {*}  {number}
   * @memberof MoleComponent
   */
  private getUpdatedScore(): number {
    return this._state.currentScore + (this._config ? this._config.typeId : 0);
  }

  /**
   * If the user doesn't click the mole within the visibility window. This
   * function will hide the mole and generate the next mole config.
   *
   * @memberof MoleComponent
   */
  private initMoleLifespan(config: ActiveMoleConfig): void {
    this.visbilityTimer = setTimeout(() => {
      // Hide the mole and 
      this.clicked = false;
      this.show = false;
      // Generates a new mole configuration and updates the subject
      this.gameSrv.setNewActiveMoleConfig();
    }, config.visibility)
  }
}
