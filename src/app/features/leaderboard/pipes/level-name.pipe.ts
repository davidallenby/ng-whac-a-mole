import { Pipe, PipeTransform } from '@angular/core';
import { GAME } from '@shared/constants/game.constants';

@Pipe({
  name: 'levelName',
  standalone: true
})
export class LevelNamePipe implements PipeTransform {

  transform(levelId: number): string {
    const found = GAME.LEVELS.find(level => levelId === level.levelId)
    return found ? found.levelName : '';
  }

}
