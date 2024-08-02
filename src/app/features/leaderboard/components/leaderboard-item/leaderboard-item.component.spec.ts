import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardItemComponent } from './leaderboard-item.component';

describe('LeaderboardItemComponent', () => {
  let component: LeaderboardItemComponent;
  let fixture: ComponentFixture<LeaderboardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaderboardItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaderboardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
