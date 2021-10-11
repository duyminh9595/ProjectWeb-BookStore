import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCommendRateBaseonBookidComponent } from './all-commend-rate-baseon-bookid.component';

describe('AllCommendRateBaseonBookidComponent', () => {
  let component: AllCommendRateBaseonBookidComponent;
  let fixture: ComponentFixture<AllCommendRateBaseonBookidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCommendRateBaseonBookidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCommendRateBaseonBookidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
