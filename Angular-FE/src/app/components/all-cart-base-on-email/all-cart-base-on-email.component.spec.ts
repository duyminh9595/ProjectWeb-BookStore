import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCartBaseOnEmailComponent } from './all-cart-base-on-email.component';

describe('AllCartBaseOnEmailComponent', () => {
  let component: AllCartBaseOnEmailComponent;
  let fixture: ComponentFixture<AllCartBaseOnEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCartBaseOnEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCartBaseOnEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
