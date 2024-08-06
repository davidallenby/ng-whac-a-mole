import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GAME } from '@shared/constants/game.constants';
import { DifficultySelectItem } from './difficulty-select.interfaces';

@Component({
  selector: 'app-difficulty-select',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './difficulty-select.component.html',
  styleUrl: './difficulty-select.component.scss'
})
export class DifficultySelectComponent {
  @Input() class: string = '';
  @Input() activeId: number|null = null;
  @Input() disabled: boolean = false;
  @Output() levelClick: EventEmitter<number> = new EventEmitter();

  options: DifficultySelectItem[] = [];

  ngOnInit() {
    this.options = GAME.LEVELS.map(opt => ({
      label: opt.levelName,
      levelId: opt.levelId,
      active: (this.activeId === opt.levelId)
    }))
  }

  clickHandler(levelId: number): void {
    // Update the active boolean.
    this.options = this.options.map((item) => ({
      ...item, active: levelId === item.levelId
    }))
    // Send event up to parent
    this.levelClick.next(levelId);
  }
}
