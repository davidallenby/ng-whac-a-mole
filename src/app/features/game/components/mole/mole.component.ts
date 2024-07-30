import { Component, Input } from '@angular/core';
import { GAME } from '@features/game/game.constants';
import { GameState } from '@features/game/game.interfaces';
import { GameService } from '@features/game/services/game.service';
import { Observable, Subscription } from 'rxjs';

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
  private _inProgress: boolean = false;
  private _state: GameState = GAME.DEFAULT_STATE;

  activeIndex: Observable<number> | undefined = undefined;

  subs: Subscription[] = []
  clicked: boolean = false;

  private timer: ReturnType<typeof setInterval> | undefined

  constructor(
    private gameSrv: GameService
  ) {
    const state = this.gameSrv.getCurrentState().subscribe(state => {
      this._inProgress = state.inProgress;
      this._state = state;
      return state.inProgress;
    });
    this.subs.push(state)

    // Subscribe to the active mole index changes.
    const activeIndex = this.gameSrv.getActiveMoleIndex().subscribe(i => {
      // If the active index matches this mole, pop up the mole
      this.show = (this._inProgress && i === this.index);
      // We won't generate the next mole if this mole index doesn't match
      if (!this.show) { return; }
      // Generate a new mole type ID if we're showing this mole
      this.moleTypeId = this.gameSrv.getNewMoleTypeId();
      // Now that we're showing our randomly generated mole character. We want
      // to initiate a countdown to auto hide the mole. If the user clicks
      // the mole within this lifespan. We'll clear the setInterval so that
      // we don't try to auto hide the mole when we've manually processed the
      // logic on click event
      this.initMoleLifespan();
      return i;
    });
    this.subs.push(activeIndex)
  }

  /**
   * Unsubscribe from Observables when this component is destroyed. This will
   * enhance performance.
   *
   * @memberof MoleComponent
   */
  ngOnDestroy() {
    clearTimeout(this.timer)
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
    // Prevent getting extra points for additional clicks or, If the user clicks 
    // this mole while it's hiding. Will prevent the new mole generation logic
    // from running again too.
    if (this.clicked || !this.show) {return;}
    // Set the mole guard to true
    this.clicked = true;
    // Prevent the auto-hide logic from running
    clearTimeout(this.timer);
    // Hide the mole (since it was clicked)
    this.show = false;
    // Get the current score value
    let currentScore = this._state.currentScore + this.moleTypeId;
    // Increment the score by 1 (notify other components)
    this.gameSrv.setCurrentState({ ...this._state, currentScore });
    // Give the hide animation a chance to complete before running the next
    // mole generation
    setTimeout(() => {
      // Remove the click guard
      this.clicked = false;
      // Generate the next mole
      this.generateNextMoleIndex();
    }, 250)
  }

  /**
   * Generate the next mole index to appear and tell the other components to
   * update
   *
   * @memberof MoleComponent
   */
  private generateNextMoleIndex(): void {
    const newMoleIndex = this.gameSrv.getRandomMoleIndex();
    this.gameSrv.setActiveMoleIndex(newMoleIndex)
  }

  /**
   * If the user doesn't click the mole within the visibility window. This
   * function will hide the mole and generate the next mole index
   *
   * @memberof MoleComponent
   */
  private initMoleLifespan(): void {
    const visibility = this.gameSrv.getRandomVisibility();
    this.timer = setTimeout(() => {
      this.clicked = false;
      this.show = false;
      this.generateNextMoleIndex();
    }, visibility)
  }
}
