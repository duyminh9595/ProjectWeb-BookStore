import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateAndCommendComponent } from './rate-and-commend.component';

describe('RateAndCommendComponent', () => {
  let component: RateAndCommendComponent;
  let fixture: ComponentFixture<RateAndCommendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateAndCommendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RateAndCommendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
