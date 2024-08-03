import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-leaderboard-position',
  standalone: true,
  imports: [],
  templateUrl: './leaderboard-position.component.html',
  styleUrl: './leaderboard-position.component.scss',
  // Changing this to OnPush strategy will improve performance. The component
  // does not depend on any state changes internally, so we don't need to mark
  // it to check for changes.
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeaderboardPositionComponent {

  private _position: number = 0; 
  set position(val: number) {
    // We'll pass the index value from the list of results. This will give the
    // user readable position value by adding 1 to the index E.g. Position 0 is
    // 1st place
    this._position = val + 1;
  }
  @Input() get position() {
    return this._position;
  }
}
