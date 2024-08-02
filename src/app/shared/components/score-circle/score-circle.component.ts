import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-score-circle',
  standalone: true,
  imports: [NgClass],
  templateUrl: './score-circle.component.html',
  styleUrl: './score-circle.component.scss'
})
export class ScoreCircleComponent {
  @Input() score: number = 0;
  @Input() index: number = 0;
  @Input() size: string = 'md';
  // Adding custom class
  private _class: string = '';
  set class(str: string) {
    this._class = str ? ` ${str}` : '';
  }
  @Input() get class(): string {
    return this._class;
  };
}
