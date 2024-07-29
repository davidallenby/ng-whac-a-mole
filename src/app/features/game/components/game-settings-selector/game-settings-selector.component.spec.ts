import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSettingsSelectorComponent } from './game-settings-selector.component';

describe('GameSettingsSelectorComponent', () => {
  let component: GameSettingsSelectorComponent;
  let fixture: ComponentFixture<GameSettingsSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameSettingsSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameSettingsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
