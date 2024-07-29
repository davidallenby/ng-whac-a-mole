import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { GameService } from '../services/game.service';

@Injectable()
export class GameOverGuard implements CanActivate {

  constructor(
    private gameSrv: GameService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.gameSrv.gameOver) {
      return this.router.navigate(['/game']);
    }
    return true;
  }
}