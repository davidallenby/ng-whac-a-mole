import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameScreenLayoutComponent } from './game-screen-layout.component';

describe('GameScreenLayoutComponent', () => {
  let component: GameScreenLayoutComponent;
  let fixture: ComponentFixture<GameScreenLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameScreenLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameScreenLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
