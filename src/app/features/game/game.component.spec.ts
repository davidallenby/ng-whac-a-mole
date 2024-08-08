import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameComponent } from './game.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { GameService } from './services/game.service';
import { GameHeaderComponent } from './components/game-header/game-header.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  const fakeActivatedRoute = {
    snapshot: {
      queryParams: {
        levelId: '1'
      }
    }
  };
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        GameComponent,
        GameHeaderComponent,
      ],
      imports: [RouterModule],
      providers: [
        GameService,
        {provide: ActivatedRoute, useValue: fakeActivatedRoute}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
