import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { GameService } from '@features/game/services/game.service';
import { map, Observable, Subscription } from 'rxjs';

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
  private _inProgress: boolean = false;
  delay: number = 0;

  activeIndex: Observable<number> | undefined = undefined;

  subs: Subscription[] = []
  clicked: boolean = false;

  private timer: ReturnType<typeof setInterval> | undefined

  constructor(
    private gameSrv: GameService
  ) {
    const inProgress = this.gameSrv.getInProgress().subscribe(bool => {
      this._inProgress = bool;
      return bool;
    });
    this.subs.push(inProgress)

    const activeIndex = this.gameSrv.getActiveMole().subscribe(i => {
      // If the active index matches this mole, pop up the mole  
      this.show = (this._inProgress && i === this.index);
      // We won't generate the next mole if this mole index doesn't match
      if (!this.show) { return; }
      this.hide();
      return i;
    });
    this.subs.push(activeIndex)
  }

  ngOnDestroy() {
    clearTimeout(this.timer)
    this.subs.forEach(sub => sub.unsubscribe())
  }

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
    let score = this.gameSrv.getScoreValue();
    // Increment the score by 1 (notify other components)
    this.gameSrv.setScore(score + 1);
    // Give the hide animation a chance to complete before running the next
    // mole generation
    setTimeout(() => {
      // Remove the click guard
      this.clicked = false;
      // Generate the next mole
      this.generateNextMole();
    }, 250)
  }

  generateNextMole(): void {
    const newMoleIndex = this.gameSrv.getRandomMoleIndex();
    this.gameSrv.setActiveMole(newMoleIndex)
  }

  hide(): void {
    const visibility = this.gameSrv.getRandomVisibility();
    this.timer = setTimeout(() => {
      this.clicked = false;
      this.show = false;
      this.generateNextMole();
    }, visibility)
  }
}
