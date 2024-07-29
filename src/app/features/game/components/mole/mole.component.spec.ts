import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoleComponent } from './mole.component';

describe('MoleComponent', () => {
  let component: MoleComponent;
  let fixture: ComponentFixture<MoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
