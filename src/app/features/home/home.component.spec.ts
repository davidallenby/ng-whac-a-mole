import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { ActivatedRoute, RouterLink } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, RouterLink],
      providers: [
        {provide: ActivatedRoute, useValue: fakeActivatedRoute}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  // Component should initialise
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Title text should appear
  it('should have h2 title text "Hello there"', () => {
    const titleElem = fixture.debugElement.nativeElement
    expect(titleElem.querySelector('h2').textContent).toContain('Hello there')
  })
});
