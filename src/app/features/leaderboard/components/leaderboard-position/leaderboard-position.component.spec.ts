import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardPositionComponent } from './leaderboard-position.component';

describe('LeaderboardPositionComponent', () => {
  let component: LeaderboardPositionComponent;
  let fixture: ComponentFixture<LeaderboardPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaderboardPositionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaderboardPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
